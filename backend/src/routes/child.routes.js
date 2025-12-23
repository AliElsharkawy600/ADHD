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
childRouter.post("/create", authMiddleware, createChild);

// كل أطفال الأب
childRouter.get("/all", authMiddleware, getMyChildren);

// طفل واحد
childRouter.get("/:childId", authMiddleware, getChildById);

// تحديث طفل
childRouter.put("/:childId", authMiddleware, updateChild);

// حذف طفل
childRouter.delete("/:childId", authMiddleware, deleteChild);

module.exports = childRouter;
