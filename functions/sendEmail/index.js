const nodemailer = require("nodemailer");

const sendEmail = (teste) => {
  const { name, email, subject, description } = teste;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.KEY_EMAIL,
    },
  });

  const mailOptions = {
    from: email,
    to: "pedrogilsenarego@gmail.com",
    subject: `Feedback from: ${name} - ${subject}`,
    text: `Message: ${description}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendEmail };
