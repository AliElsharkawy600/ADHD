// Category Model (المجال العلاجي)
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["attention", "perception", "memory", "cognitive_emotional"],
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
