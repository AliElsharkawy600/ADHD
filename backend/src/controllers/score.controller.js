// const Score = require("../models/Score");

// // الدالة الأولى (موجودة في صورتك)
// exports.saveScore = async (req, res) => {
//   try {
//     const { score, total } = req.body;
//     const percentage = Math.round((score / total) * 100);
//     const newScore = new Score({
//       score,
//       total,
//       percentage,
//       createdAt: new Date(),
//     });
//     await newScore.save();
//     res.status(201).json({ success: true, data: newScore });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // الدالة الثانية (اللي ناقصة ومسببة المشكلة)
// exports.getLatestScore = async (req, res) => {
//   try {
//     const latest = await Score.findOne().sort({ createdAt: -1 });
//     res.status(200).json(latest);
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
