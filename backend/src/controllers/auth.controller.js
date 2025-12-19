const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const Parent = require("../models/Parent");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mailer = require("../config/mailer");

// Register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await Parent.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);

  await Parent.create({ name, email, password: hashed });
  res.json({ message: "Account created successfully" });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const parent = await Parent.findOne({ email });
  if (!parent) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, parent.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: parent._id, email: parent.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const parent = await Parent.findOne({ email });
  if (!parent) return res.json({ message: "If email exists, code sent" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedCode = crypto.createHash("sha256").update(code).digest("hex");

  parent.resetCode = hashedCode;
  parent.resetCodeExpires = Date.now() + 15 * 60 * 1000;
  await parent.save();

  await mailer.sendMail({
    to: email,
    subject: "Reset Password Code",
    html: `<h3>Your verification code</h3><h2>${code}</h2><p>Expires in 15 minutes</p>`,
  });

  res.json({ message: "Verification code sent to email" });
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  const hashedCode = crypto.createHash("sha256").update(code).digest("hex");

  const parent = await Parent.findOne({
    email,
    resetCode: hashedCode,
    resetCodeExpires: { $gt: Date.now() },
  });

  if (!parent)
    return res.status(400).json({ message: "Invalid or expired code" });

  parent.password = await bcrypt.hash(newPassword, 10);
  parent.resetCode = undefined;
  parent.resetCodeExpires = undefined;
  await parent.save();

  res.json({ message: "Password reset successfully" });
};

// google login
exports.googleLogin = async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let parent = await Parent.findOne({ email });

    if (!parent) {
      parent = await Parent.create({
        name,
        email,
        provider: "google",
      });
    }

    const token = jwt.sign(
      { id: parent._id, email: parent.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: "Invalid Google token" });
  }
};
