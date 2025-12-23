// const mongoose = require("mongoose");

// const parentSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: { type: String, unique: true },
//     password: String,

//     provider: {
//       type: String,
//       enum: ["local", "google"],
//       default: "local",
//     },

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
    email: { type: String, unique: true, required: true },
    password: String,

    children: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Child" }
    ],

    isVerified: { type: Boolean, default: false },
    verificationCode: String,
    verificationCodeExpires: Date,

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
