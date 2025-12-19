const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const Parent = require("../models/Parent");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mailer = require("../config/mailer");
const { sendVerificationEmail } = require("../config/mailer");
// Register
// exports.register = async (req, res) => {
//   const { name, email, password } = req.body;

//   const exists = await Parent.findOne({ email });
//   if (exists) return res.status(400).json({ message: "Email already exists" });

//   const hashed = await bcrypt.hash(password, 10);

//   await Parent.create({ name, email, password: hashed });
//   res.json({ message: "Account created successfully" });
// };

// STEP 1: Register Request
exports.register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // 1️⃣ Validation
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const exists = await Parent.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 2️⃣ Generate 6-digit code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Save temp user
    await Parent.create({
      email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpires: Date.now() + 10 * 60 * 1000, // 10 min
    });

    // 5️⃣ Send email
    // await sendVerificationEmail(email, verificationCode);
    await mailer.sendMail({
      to: email,
      subject: "Verify Your Account",
      html: `<h3>Your verification code is:</h3>
             <h2>${verificationCode}</h2>
             <p>Code expires in 10 minutes</p>`,
    });

    res.status(200).json({
      message: "Verification code sent to email",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// STEP 2: Verify Code
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await Parent.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (
      user.verificationCode !== code ||
      user.verificationCodeExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    // Activate account
    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    res.json({ message: "Account verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
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
