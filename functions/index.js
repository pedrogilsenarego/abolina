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
    success_url: "http://localhost:3000/buy-success",
    cancel_url: "http://localhost:3000/buy-success",
    metadata: metadata,
  });

  res.status(200).send(
    JSON.stringify({
      url: session.url,
    })
  );
});

//implement this after for a sucess buy
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
        const items = JSON.parse(dataObject.metadata.items);
        const values = JSON.parse(dataObject.metadata.values);
        const userId = values.userId;
        try {
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
    console.log(req.body);
    //const submitFeedback = await sendEmail(req.body);
    // res.status(200).send(submitFeedback);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
});

exports.api = functions.https.onRequest(app);
