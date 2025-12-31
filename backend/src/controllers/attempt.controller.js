const GameAttempt = require("../models/GameAttempt");
const Game = require("../models/Game");
const { recalculateProgress } = require("./progress.controller");

exports.submitAttempt = async (req, res) => {
  const { childId, gameId, score, total, duration } = req.body;

  // 1️⃣ نجيب اللعبة
  const game = await Game.findById(gameId);
  if (!game || !game.isActive) {
    return res.status(404).json({ message: "Game not available" });
  }

  // 2️⃣ نحسب النتيجة
  const percentage = (score / total) * 100;
  const passed = percentage >= game.passPercentage;

  // 3️⃣ نعد عدد المحاولات السابقة
  const previousAttempts = await GameAttempt.countDocuments({
    child: childId,
    game: gameId,
  });

  if (previousAttempts >= game.maxAttempts) {
    return res.status(400).json({
      message: "Max attempts reached",
    });
  }

  // 4️⃣ نسجل المحاولة
  const attempt = await GameAttempt.create({
    child: childId,
    game: gameId,
    score,
    total,
    percentage,
    passed,
    attemptNumber: previousAttempts + 1,
    durationInSeconds: duration,
  });

  // 5️⃣ ⭐ نحدّث تقدم الطفل (الربط المهم)
  await recalculateProgress(childId);

  // 6️⃣ نرجّع النتيجة
  res.status(201).json({
    message: "Attempt submitted successfully",
    attempt,
  });
};
