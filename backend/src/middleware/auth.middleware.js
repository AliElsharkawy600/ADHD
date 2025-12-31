const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // 1️⃣ قراءة Authorization Header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 2️⃣ استخراج التوكن
    const token = authHeader.split(" ")[1];

    // 3️⃣ التحقق من التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ إضافة بيانات المستخدم للـ request
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };

    // 5️⃣ السماح بالمرور
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
