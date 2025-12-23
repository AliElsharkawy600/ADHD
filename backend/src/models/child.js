const mongoose = require("mongoose");
const childSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: Number,

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Child", childSchema);
