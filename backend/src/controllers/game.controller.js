// Game Controller (إدارة الألعاب – الدكتور)

const Game = require("../models/Game");
const Level = require("../models/Level");

exports.createGame = async (req, res) => {
  const { name, levelId, maxAttempts, passPercentage } = req.body;

  const level = await Level.findById(levelId);
  if (!level) {
    return res.status(404).json({ message: "Level not found" });
  }

  const game = await Game.create({
    name,
    level: levelId,
    maxAttempts,
    passPercentage,
    createdBy: "doctor",
  });

  res.status(201).json(game);
};

exports.getGamesByLevel = async (req, res) => {
  const { levelId } = req.params;

  const games = await Game.find({
    level: levelId,
    isActive: true,
  });

  res.json(games);
};

exports.toggleGameStatus = async (req, res) => {
  const game = await Game.findById(req.params.id);

  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }

  game.isActive = !game.isActive;
  await game.save();

  res.json(game);
};
