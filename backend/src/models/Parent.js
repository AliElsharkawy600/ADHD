// const mongoose = require("mongoose");

// const parentSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },

//     resetCode: String,
//     resetCodeExpires: Date,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Parent", parentSchema);
const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    resetCode: String,
    resetCodeExpires: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parent", parentSchema);
