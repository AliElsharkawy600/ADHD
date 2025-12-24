const mongoose = require("mongoose");
const childSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    birthDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const today = new Date();
          let age = today.getFullYear() - value.getFullYear();

          const m = today.getMonth() - value.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < value.getDate())) {
            age--;
          }

          return age >= 3 && age <= 9;
        },
        message: "عمر الطفل يجب أن يكون بين 3 و 9 سنوات",
      },
    },
    gender: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Child", childSchema);
