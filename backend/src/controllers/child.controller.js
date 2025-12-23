const Child = require("../models/Child.js");

/**
 * إنشاء طفل جديد
 */
exports.createChild = async (req, res) => {
    try {
        const parentId = req.user.id;

        // التحقق مما إذا كان لدى الأب طفل بالفعل
        const existingChild = await Child.findOne({ parent: parentId });
        if (existingChild) {
            return res.status(400).json({ message: "مسموح بإضافة طفل واحد فقط" });
        }

        const { name, age, avatar } = req.body;

        if (!name || !age) {
            return res.status(400).json({ message: "الاسم والعمر مطلوبين" });
        }

        const child = await Child.create({
            parent: parentId,
            name,
            age,
            avatar
        });

        res.status(201).json({
            message: "تم إنشاء الطفل بنجاح",
            child
        });

    } catch (error) {
        res.status(500).json({ message: "خطأ في السيرفر" });
    }
};

/**
 * جلب كل الأطفال للأب
 */
exports.getMyChildren = async (req, res) => {
    try {
        const children = await Child.find({ parent: req.user.id });
        res.json(children);
    } catch {
        res.status(500).json({ message: "خطأ في السيرفر" });
    }
};

/**
 * جلب طفل واحد
 */
exports.getChildById = async (req, res) => {
    try {
        const child = await Child.findById(req.params.childId);
        console.log(child);
        if (!child) {
            return res.status(404).json({ message: "الطفل غير موجود" });
        }

        res.json(child);
    } catch {
        res.status(500).json({ message: "خطأ في السيرفر" });
    }
};

/**
 * تحديث بيانات الطفل
 */
exports.updateChild = async (req, res) => {
    try {
        const child = await Child.findById(req.params.childId);
        if (!child) {
            return res.status(404).json({ message: "الطفل غير موجود" });
        }
        child.name = req.body.name || child.name;
        child.age = req.body.age || child.age;
        child.avatar = req.body.avatar || child.avatar;
        await child.updateOne({
            name: child.name,
            age: child.age,
            avatar: child.avatar
        });
        res.json({ message: "تم تحديث بيانات الطفل بنجاح" });
    } catch {
        res.status(500).json({ message: "خطأ في السيرفر" });
    }
};

/**
 * حذف طفل
 */
exports.deleteChild = async (req, res) => {
    try {
        const child = await Child.findByIdAndDelete(req.params.childId);
        if (!child) {
            return res.status(404).json({ message: "الطفل غير موجود" });
        }
        res.json({ message: "تم حذف الطفل بنجاح" });
    } catch {
        res.status(500).json({ message: "خطأ في السيرفر" });
    }
};
