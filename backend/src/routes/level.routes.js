const router = require("express").Router();
const { getLevelByParams } = require("../controllers/level.controller");

router.get(
  "/by-criteria/:categoryName/:modality/:levelNumber",
  getLevelByParams
);

module.exports = router;
