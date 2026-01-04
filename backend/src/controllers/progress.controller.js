const GameAttempt = require("../models/GameAttempt");
const Progress = require("../models/Progress");

exports.recalculateProgress = async (childId) => {
  const attempts = await GameAttempt.find({ child: childId });

  if (!attempts.length) return;

  const completedGames = attempts.filter((a) => a.passed).length;

  const averageScore =
    attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length;

  await Progress.findOneAndUpdate(
    { child: childId },
    {
      child: childId,
      completedGames,
      averageScore,
      lastUpdated: new Date(),
    },
    { upsert: true }
  );
};

exports.getHomeProgress = async (req, res) => {
  try {
    const { childId } = req.params;

    // 1️⃣ جلب كل المحاولات للطفل
    const progresses = await Progress.find({ child: childId });
    console.log(progresses);
    if (!progresses) {
      return res.json({
        averageScore: 0,
        completedGames: 0,
      });
    }

    res.json({
      averageScore: progresses.length > 0 ? progresses[0].averageScore : 0,
      completedGames: progresses.length > 0 ? progresses[0].completedGames : 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
