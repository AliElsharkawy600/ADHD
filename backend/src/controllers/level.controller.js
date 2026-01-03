const Level = require("../models/Level");
const Category = require("../models/Category");

exports.getLevelByParams = async (req, res) => {
  try {
    const { categoryName, modality, levelNumber } = req.params;

    // 1️⃣ هات Category بالاسم
    const category = await Category.findOne({
      name: categoryName, // attention
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // 2️⃣ هات Level
    const level = await Level.findOne({
      category: category._id,
      modality: modality,
      levelNumber: Number(levelNumber),
    });

    if (!level) {
      return res.status(404).json({ message: "Level not found" });
    }

    // 3️⃣ Response
    res.json({
      categoryId: category._id,
      categoryName: category.name,
      modality: level.modality,
      levelId: level._id,
      levelNumber: level.levelNumber,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
