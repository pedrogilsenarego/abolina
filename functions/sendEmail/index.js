const nodemailer = require("nodemailer");

const sendEmail = (teste) => {
  const { name, email, subject, description } = teste;
  const transporter = nodemailer.createTransport({
    service: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.KEY_EMAIL,
    },
  });

  const mailOptions = {
    from: email || "business2connecting@gmail.com",
    to: "business2connecting@gmail.com",
    subject: `Feedback from: ${name} - ${subject}`,
    html: `Message: ${description}`,
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
