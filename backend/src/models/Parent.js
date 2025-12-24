const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^(010|011|012|015)[0-9]{8}$/, "رقم الموبايل غير صحيح"],
    },

    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Child" }],

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
