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
