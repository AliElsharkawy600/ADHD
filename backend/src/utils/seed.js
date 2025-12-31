const Category = require("../models/Category");
const Level = require("../models/Level");

module.exports = async () => {
  const categories = [
    "attention",
    "perception",
    "memory",
    "cognitive_emotional",
  ];

  for (const name of categories) {
    // 1️⃣ إنشاء أو جلب Category
    const category = await Category.findOneAndUpdate(
      { name },
      { name },
      { upsert: true, new: true }
    );

    // 2️⃣ إنشاء Levels
    for (let level = 1; level <= 4; level++) {
      for (const modality of ["visual", "auditory"]) {
        await Level.findOneAndUpdate(
          {
            category: category._id,
            modality,
            levelNumber: level,
          },
          {
            category: category._id,
            modality,
            levelNumber: level,
          },
          { upsert: true }
        );
      }
    }
  }
};
