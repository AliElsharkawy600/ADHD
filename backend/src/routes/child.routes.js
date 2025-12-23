const express = require("express");
const authMiddleware = require("../middleware/auth.middleware.js");
const {
    createChild,
    getMyChildren,
    getChildById,
    updateChild,
    deleteChild
} = require("../controllers/child.controller.js");

const childRouter = express.Router();

// إنشاء طفل
childRouter.post("/", authMiddleware, createChild);

// جلب أطفال الأب
childRouter.get("/", authMiddleware, getMyChildren);

// طفل واحد
childRouter.get("/:childId", authMiddleware, getChildById);

// تحديث طفل
childRouter.put("/:childId", authMiddleware, updateChild);

// حذف طفل
childRouter.delete("/:childId", authMiddleware, deleteChild);

module.exports = childRouter;
