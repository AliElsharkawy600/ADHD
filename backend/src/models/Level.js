// Level Model (المستويات)
const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  modality: {
    type: String,
    enum: ["visual", "auditory"],
    required: true,
  },
  levelNumber: {
    type: Number,
    min: 1,
    max: 4,
    required: true,
  },
});

levelSchema.index(
  { category: 1, modality: 1, levelNumber: 1 },
  { unique: true }
);

module.exports = mongoose.model("Level", levelSchema);
