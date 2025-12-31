const router = require("express").Router();
const { submitAttempt } = require("../controllers/attempt.controller");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, submitAttempt);

module.exports = router;
