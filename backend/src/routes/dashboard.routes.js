// Dashboard Routes (تقارير الدكتور)
const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const { childReport } = require("../controllers/dashboard.controller");

router.get("/child/:childId", auth, role("doctor"), childReport);
// router.get("/child/:childId", auth, childReport);

module.exports = router;
