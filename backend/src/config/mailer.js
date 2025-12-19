const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationEmail = async (email, code) => {
  await transporter.sendMail({
    from: `"Nama App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Account",
    html: `<h3>Your verification code is:</h3>
           <h2>${code}</h2>
           <p>Code expires in 10 minutes</p>`,
  });
};

module.exports = transporter;
