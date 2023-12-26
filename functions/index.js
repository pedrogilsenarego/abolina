const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();

const admin = require("firebase-admin");
const { sendEmail } = require("./sendEmail");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST);

admin.initializeApp(functions.config().firebase);
const usersCollection = admin.firestore().collection("users");
const couponsCollection = admin.firestore().collection("cuppons");

app.use(
  cors({
    origin: true,
  })
);
app.use(express.static("public"));
app.use(express.json());

app.post("/payments/creditCard", async (req, res) => {
  let lineItems = [];
  const items = req.body.items;
  const values = req.body.values;
  const metadata = {
    items: JSON.stringify(items),
    values: JSON.stringify(values),
  };

  if (typeof items !== "undefined") {
    items.forEach((item) => {
      lineItems.push({
        price_data: {
          currency: "eur",
          unit_amount: item.amount,
          product_data: {
            name: item.title,
          },
        },
        quantity: item.quantity,
      });
    });
  }

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "https://abolina-a5745.web.app/buy-success",
    cancel_url: "http://localhost:3000/buy-success",
    metadata: metadata,
  });

  res.status(200).send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.post("/payments/creditCard-mobile", async (req, res) => {
  const amount = req.body.amount;
  const items = req.body.items;
  const values = req.body.values;
  const metadata = {
    items: JSON.stringify(items),
    values: JSON.stringify(values),
  };
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2023-10-16" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    metadata,
    amount,
    currency: "eur",
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      "pk_test_51JVYiDAJkp7H04iOOXZ2UnP8mZrYzc7G7sdSAUqyFEFEhuaFuRQX8FWwhHxHT2VyiLwKfucVzg5cGhIjTVYoqDRf00bALgrQ4E",
  });
});

app.post(
  "/webhook-success-buy",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET_TEST
      );
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    const dataObject = event.data.object;

    // Handle the event

    switch (event.type) {
      case "checkout.session.completed":
        try {
          const items = JSON.parse(dataObject.metadata.items);
          const values = JSON.parse(dataObject.metadata.values);
          const userId = values.userId;
          // Update the user document with the purchased books
          const booksToAdd = items
            .filter((item) => !item.onlyOffer && item.documentId)
            .map((item) => item.documentId);

          if (booksToAdd.length > 0) {
            await usersCollection.doc(userId).update({
              booksOwned: admin.firestore.FieldValue.arrayUnion(...booksToAdd),
            });
          }

          const couponPromises = items.map(async (item) => {
            if (item.quantity > 0) {
              const couponIds = [];
              const iterations = item.onlyOffer
                ? item.quantity
                : item.quantity - 1;

              for (let i = 0; i < iterations; i++) {
                const couponData = {
                  userId: userId,
                  bookId: item.documentId,
                };

                const docRef = await couponsCollection.add(couponData);
                couponIds.push(docRef.id);
              }

              return {
                title: item.title,
                couponIds: couponIds,
              };
            }
          });

          const couponsResult = await Promise.all(couponPromises);
          const emailContent = couponsResult
            .filter((result) => result && result.couponIds.length > 0)
            .map((result) => {
              const couponList = result.couponIds.join(" - ");
              return `Here are the coupons for ${result.title}: ${couponList}`;
            })
            .join("\n");

          console.log(emailContent);

          //sendEmail(userId, emailContent);

          // Update the user document with the purchased coupons
          const couponsToAdd = couponsResult
            .filter((result) => result && result.couponIds.length > 0)
            .map((result) => ({
              couponId: result.couponIds,
              title: result.title,
              bookId: items.find((item) => item.title === result.title)
                ?.documentId,
            }));

          if (couponsToAdd.length > 0) {
            const userDoc = usersCollection.doc(userId);
            const userSnapshot = await userDoc.get();

            if (userSnapshot.exists) {
              const userData = userSnapshot.data();
              const existingCoupons = userData.coupons || [];

              // Find the existing coupon object with the same book ID
              const existingCouponIndex = existingCoupons.findIndex(
                (coupon) => coupon.bookId === couponsToAdd[0].bookId
              );

              if (existingCouponIndex !== -1) {
                // Add the new coupon IDs to the existing coupon object
                existingCoupons[existingCouponIndex].couponId.push(
                  ...couponsToAdd[0].couponId
                );
              } else {
                // Add the new coupon object to the existing coupons array
                existingCoupons.push(couponsToAdd[0]);
              }

              // Update the user document with the updated coupons array
              await userDoc.update({
                coupons: existingCoupons,
              });
            }
          }

          return response.status(200).send("Payment successful");
        } catch (error) {
          console.error("Error updating user document:", error);
          return response.status(500).send("An error occurred");
        }
      case "payment_intent.succeeded":
        try {
          const itemsA = JSON.parse(dataObject.charges.data[0].metadata.items);
          const valuesA = JSON.parse(
            dataObject.charges.data[0].metadata.values
          );
          const userIdA = valuesA.userId;
          // Update the user document with the purchased books
          const booksToAdd = itemsA
            .filter((item) => !item.onlyOffer && item.documentId)
            .map((item) => item.documentId);

          if (booksToAdd.length > 0) {
            await usersCollection.doc(userIdA).update({
              booksOwned: admin.firestore.FieldValue.arrayUnion(...booksToAdd),
            });
          }

          const couponPromises = itemsA.map(async (item) => {
            if (item.quantity > 0) {
              const couponIds = [];
              const iterations = item.onlyOffer
                ? item.quantity
                : item.quantity - 1;

              for (let i = 0; i < iterations; i++) {
                const couponData = {
                  userId: userIdA,
                  bookId: item.documentId,
                };

                const docRef = await couponsCollection.add(couponData);
                couponIds.push(docRef.id);
              }

              return {
                title: item.title,
                couponIds: couponIds,
              };
            }
          });

          const couponsResult = await Promise.all(couponPromises);
          const emailContent = couponsResult
            .filter((result) => result && result.couponIds.length > 0)
            .map((result) => {
              const couponList = result.couponIds.join(" - ");
              return `Here are the coupons for ${result.title}: ${couponList}`;
            })
            .join("\n");

          console.log(emailContent);

          //sendEmail(userIdA, emailContent);

          // Update the user document with the purchased coupons
          const couponsToAdd = couponsResult
            .filter((result) => result && result.couponIds.length > 0)
            .map((result) => ({
              couponId: result.couponIds,
              title: result.title,
              bookId: itemsA.find((item) => item.title === result.title)
                ?.documentId,
            }));

          if (couponsToAdd.length > 0) {
            const userDoc = usersCollection.doc(userIdA);
            const userSnapshot = await userDoc.get();

            if (userSnapshot.exists) {
              const userData = userSnapshot.data();
              const existingCoupons = userData.coupons || [];

              // Find the existing coupon object with the same book ID
              const existingCouponIndex = existingCoupons.findIndex(
                (coupon) => coupon.bookId === couponsToAdd[0].bookId
              );

              if (existingCouponIndex !== -1) {
                // Add the new coupon IDs to the existing coupon object
                existingCoupons[existingCouponIndex].couponId.push(
                  ...couponsToAdd[0].couponId
                );
              } else {
                // Add the new coupon object to the existing coupons array
                existingCoupons.push(couponsToAdd[0]);
              }

              // Update the user document with the updated coupons array
              await userDoc.update({
                coupons: existingCoupons,
              });
            }
          }

          return response.status(200).send("Payment successful");
        } catch (error) {
          console.error("Error updating user document:", error);
          return response.status(500).send("An error occurred");
        }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.post("/submit-feedback", async (req, res) => {
  try {
    const submitFeedback = sendEmail(req.body.values);
    res.status(200).send(submitFeedback);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
});

exports.api = functions.https.onRequest(app);
