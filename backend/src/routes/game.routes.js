const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const {
  createGame,
  getGamesByLevel,
  toggleGameStatus,
} = require("../controllers/game.controller");

// router.post("/", auth, role("doctor"), createGame);
router.post("/", auth, createGame);
router.get("/level/:levelId", auth, getGamesByLevel);
// router.patch("/:id/toggle", auth, role("doctor"), toggleGameStatus);
router.patch("/:id/toggle", auth, toggleGameStatus);


module.exports = router;
