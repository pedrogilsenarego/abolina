const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();

const admin = require("firebase-admin");
const { sendEmail } = require("./sendEmail");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST);

admin.initializeApp(functions.config().firebase);
const usersCollection = admin.firestore().collection("users");

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
  //
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

    return res.status(200).send("Payment successful");
  } catch (error) {
    console.error("Error updating user document:", error);
    return res.status(500).send("An error occurred");
  }

  //

  // if (typeof items !== "undefined") {
  //   items.forEach((item) => {
  //     lineItems.push({
  //       price_data: {
  //         currency: "eur",
  //         unit_amount: item.amount,
  //         product_data: {
  //           name: item.title,
  //         },
  //       },
  //       quantity: item.quantity,
  //     });
  //   });
  // }

  // const session = await stripe.checkout.sessions.create({
  //   line_items: lineItems,
  //   mode: "payment",
  //   success_url: "http://localhost:3000/buy-success",
  //   cancel_url: "http://localhost:3000/buy-success",
  //   metadata: values,
  // });

  // res.status(200).send(
  //   JSON.stringify({
  //     url: session.url,
  //   })
  // );
});

//implement this after for a sucess buy
app.post(
  "/webhook-success-buy",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET_LIVE
      );
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    const dataObject = event.data.object;

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        sendEmail(dataObject.metadata.email);
        break;

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
