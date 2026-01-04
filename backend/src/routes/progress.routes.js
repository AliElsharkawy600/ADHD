const router = require("express").Router();
const { getHomeProgress } = require("../controllers/progress.controller");

router.get("/home/:childId", getHomeProgress);

module.exports = router;
