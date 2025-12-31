// Doctor Dashboard APIs (Analytics)
const GameAttempt = require("../models/GameAttempt");
const mongoose = require("mongoose");

exports.childReport = async (req, res) => {
  const { childId } = req.params;

  const stats = await GameAttempt.aggregate([
    {
      $match: {
        child: new mongoose.Types.ObjectId(childId),
      },
    },
    {
      $group: {
        _id: "$child",
        avgScore: { $avg: "$percentage" },
        totalAttempts: { $sum: 1 },
        passedGames: {
          $sum: { $cond: ["$passed", 1, 0] },
        },
      },
    },
  ]);

  res.json(stats[0]);
};
