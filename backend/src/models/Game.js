// Game Model (اللعبة نفسها)
const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: true,
    },

    maxAttempts: { type: Number, default: 3 },
    passPercentage: { type: Number, default: 80 },

    isActive: { type: Boolean, default: true },

    createdBy: {
      type: String,
      enum: ["system", "doctor"],
      default: "system",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
