// Progress Model (ملخص ذكي لكل طفل)
const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      unique: true,
    },

    completedGames: Number,
    averageScore: Number,

    attentionLevel: Number,
    memoryLevel: Number,
    perceptionLevel: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);
