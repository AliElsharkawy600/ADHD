const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // tls:{
  //   rejectUnauthorized: false
  // }
});

exports.sendVerificationEmail = async (email, code) => {
  await transporter.sendMail({
    from: `"Nama App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Account",
    html: `<h3>كود التحقق الخاص بك هو:</h3>
           <h2>${code}</h2>
           <p>سينتهي هذا الكود بعد 10 دقيقة</p>`,
  });
};

module.exports = transporter;
