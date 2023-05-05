const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();

const admin = require("firebase-admin");
const { sendEmail } = require("./sendEmail");

admin.initializeApp(functions.config().firebase);

app.use(cors());

app.get("/home", (req, res) => {
  res.status(200).send({ data: "welcome" });
});

app.post("/submit-feedback", async (req, res) => {
  try {
    console.log(req.body);
    const submitFeedback = await sendEmail(req.body);
    // res.status(200).send(submitFeedback);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
});

exports.api = functions.https.onRequest(app);
