const nodemailer = require("nodemailer");

const sendEmail = (teste) => {
  const { name, email, subject, description } = teste;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    //host: "smtp.gmail.com",
    //port: 465,
    //secure: true, // true for 465, false for 587
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.KEY_EMAIL,
    },
  });

  const mailOptions = {
    from: email || "business2connecting@gmail.com",
    to: "abolinaeditora@abolina.pt",
    subject: `Feedback from: ${name} - ${email} - ${subject}`,
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
