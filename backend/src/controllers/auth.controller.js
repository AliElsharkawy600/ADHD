const Parent = require("../models/Parent");
const Child = require("../models/Child");
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
    const { email, phoneNumber, password, confirmPassword } = req.body;

    // 1️⃣ Validation
    if (!email || !phoneNumber || !password || !confirmPassword) {
      return res.status(400).json({ message: "كل الحقول مطلوبة" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "كلمات المرور غير متطابقة" });
    }

    const exists = await Parent.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ message: "البريد الإلكتروني موجود بالفعل" });
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
      phoneNumber,
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
      message: "تم إرسال رمز التحقق إلى البريد الإلكتروني",
    });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر" });
  }
};

// STEP 2: Verify Code
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await Parent.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "المستخدم غير موجود" });
    }

    if (
      user.verificationCode !== code ||
      user.verificationCodeExpires < Date.now()
    ) {
      return res
        .status(400)
        .json({ message: "رمز غير صالح أو منتهي الصلاحية" });
    }

    // Activate account
    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    res.json({ message: "تم التحقق من الحساب بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر" });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const parent = await Parent.findOne({ email });
  if (!parent) return res.status(400).json({ message: "بيانات غير صحيحة" });

  const match = await bcrypt.compare(password, parent.password);
  if (!match) return res.status(400).json({ message: "بيانات غير صحيحة" });

  const token = jwt.sign(
    { id: parent._id, email: parent.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user: {
      id: parent._id,
      email: parent.email,
      hasChildren: parent.children.length > 0,
    },
  });
};

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const parent = await Parent.findOne({ email });
//     if (!parent) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // 🔥 IMPORTANT: Check provider FIRST
//     if (parent.provider && parent.provider !== "local") {
//       return res.status(400).json({
//         message: `This email is registered using ${parent.provider}. Please login with ${parent.provider}.`,
//       });
//     }

//     // 🔐 Local login only
//     if (!parent.password) {
//       return res.status(400).json({
//         message: "Password login not available for this account",
//       });
//     }

//     const match = await bcrypt.compare(password, parent.password);
//     if (!match) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: parent._id, email: parent.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const parent = await Parent.findOne({ email });
  if (!parent)
    return res.json({
      message: "في حال وجود بريد إلكتروني، سيتم إرسال الرمز.",
    });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedCode = crypto.createHash("sha256").update(code).digest("hex");

  parent.resetCode = hashedCode;
  parent.resetCodeExpires = Date.now() + 15 * 60 * 1000;
  await parent.save();

  await mailer.sendMail({
    to: email,
    subject: "Reset Password Code",
    html: `<h3>Your Reset Password code</h3><h2>${code}</h2><p>Expires in 15 minutes</p>`,
  });

  res.json({ message: "تم إرسال رمز التحقق إلى البريد الإلكتروني" });
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

  if (!parent) return res.status(400).json({ message: "بيانات غير صحيحة" });

  parent.password = await bcrypt.hash(newPassword, 10);
  parent.resetCode = undefined;
  parent.resetCodeExpires = undefined;
  await parent.save();

  res.json({ message: "تم إعادة تعيين كلمة المرور بنجاح" });
};

// google login
// exports.googleLogin = async (req, res) => {
//   const { accessToken } = req.body;

//   try {
//     // Fetch user info from Google using access token
//     const response = await fetch(
//       "https://www.googleapis.com/oauth2/v2/userinfo",
//       {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       }
//     );

//     if (!response.ok) {
//       return res.status(401).json({ message: "Invalid Google token" });
//     }

//     const payload = await response.json();
//     const { email, name, picture } = payload;

//     let parent = await Parent.findOne({ email });

//     if (!parent) {
//       parent = await Parent.create({
//         name,
//         email,
//         provider: "google",
//         isVerified: true, // Google accounts are pre-verified
//         children: [],
//       });
//     }

//     const token = jwt.sign(
//       { id: parent._id, email: parent.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       token,
//       user: {
//         id: parent._id,
//         email: parent.email,
//         hasChildren: parent.children.length > 0,
//       },
//     });
//   } catch (err) {
//     res.status(401).json({ message: "Invalid Google token" });
//   }
// };
exports.googleLogin = async (req, res) => {
  const { accessToken } = req.body;

  try {
    // 1️⃣ Get user info from Google
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return res.status(401).json({ message: "رمز جوجل غير صالح" });
    }

    const { email, name, picture } = await response.json();

    // 2️⃣ Find or create parent
    let parent = await Parent.findOne({ email });

    if (!parent) {
      parent = await Parent.create({
        name,
        email,
        provider: "google",
        isVerified: true,
        children: [],
      });
    }

    // 3️⃣ Create JWT
    const token = jwt.sign({ id: parent._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 4️⃣ Unified response (IMPORTANT)
    res.json({
      token,
      user: {
        id: parent._id,
        email: parent.email,
        hasChildren: parent.children.length > 0,
      },
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(401).json({ message: "رمز جوجل غير صالح" });
  }
};

// create child for parent
exports.addChild = async (req, res) => {
  const { name, birthDate, gender, country, city } = req.body;
  const parentId = req.user.id; // جاي من JWT middleware

  if (!name || !birthDate || !gender || !country || !city) {
    return res.status(400).json({ message: "كل الحقول مطلوبة" });
  }

  const childExists = await Child.findOne({ name, parent: parentId });
  if (childExists) {
    return res.status(400).json({ message: "طفل موجود بالفعل" });
  }

  try {
    // 1️⃣ Create child WITH parent
    const child = await Child.create({
      name,
      birthDate,
      gender,
      country,
      city,
      parent: parentId,
    });

    // 2️⃣ Add child to parent
    await Parent.findByIdAndUpdate(parentId, {
      $push: { children: child._id },
    });

    res.status(201).json({
      message: "تم إنشاء الطفل بنجاح",
      childId: child._id,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "فشل في إنشاء الطفل" });
  }
};
