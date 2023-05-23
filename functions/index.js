const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();

const admin = require("firebase-admin");
const { sendEmail } = require("./sendEmail");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST);

admin.initializeApp(functions.config().firebase);

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
    cancel_url: "https://octo-mistic.com/cancel",
    metadata: values,
  });

  res.status(200).send(
    JSON.stringify({
      url: session.url,
    })
  );
});

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
