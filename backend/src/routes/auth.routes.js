const express = require("express");
const controller = require("../controllers/auth.controller");

const router = express.Router();

// router.post("/register", controller.register);
router.post("/register", controller.register);
router.post("/verify-email", controller.verifyEmail);
router.post("/login", controller.login);
router.post("/forgot-password", controller.forgotPassword);
router.post("/reset-password", controller.resetPassword);
router.post("/google", controller.googleLogin);

module.exports = router;
