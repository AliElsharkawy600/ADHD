const mongoose = require("mongoose");
const childSchema = new mongoose.Schema(
  {
    // name: { type: String, required: true },
    name: {
      type: String,
      trim: true, // مهم جداً عشان يشيل المسافات من الطرفين تلقائياً
      required: [true, "اسم الطفل مطلوب"],
      validate: {
        validator: function (v) {
          // return /^[^\s]+(\s+[^\s]+){3,}$/.test(v.trim()); // يتأكد إن فيه على الأقل 3 مسافات تفصل بين 4 كلمات
          return v.trim().split(/\s+/).length >= 4; // يقسم النص بناءً على المسافات ويعد الكلمات الفعلية
        },
        message: "يجب إدخال الاسم رباعياً على الأقل",
      },
    },
    birthDate: {
      type: Date,
      // age: {
      //   type: String,
      required: true,
      validate: {
        validator: function (value) {
          const today = new Date();
          let age = today.getFullYear() - value.getFullYear();

          const m = today.getMonth() - value.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < value.getDate())) {
            age--;
          }
          // validator: function (age) {
          return age >= 3 && age <= 9;
        },
        message: "عمر الطفل يجب أن يكون بين 3 و 9 سنوات",
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "يجب أن يكون النوع إما ولد أو بنت",
      },
      required: [true, "لا يمكن ترك النوع فارغا"],
    },
    country: { type: String, required: true },
    city: { type: String, required: true },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
    },
    parentPhoneNumber: {
      type: String,
      required: true,
      match: [/^(010|011|012|015)[0-9]{8}$/, "رقم الموبايل غير صحيح"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Child", childSchema);
