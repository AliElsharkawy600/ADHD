//  GameAttempt Model (أهم موديل)
//ده اللي هيبني عليه كل التحليلات
const mongoose = require("mongoose");

const gameAttemptSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },

    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },

    score: Number,
    total: Number,
    percentage: Number,

    attemptNumber: Number,

    passed: Boolean,

    durationInSeconds: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("GameAttempt", gameAttemptSchema);
