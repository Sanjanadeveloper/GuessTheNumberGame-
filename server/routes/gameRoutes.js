const express = require("express");
const { submitGuess, getLeaderboard, resetGame } = require("../controllers/gameController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/guess", authMiddleware, submitGuess);
router.get("/leaderboard", authMiddleware, getLeaderboard);
router.patch("/reset", authMiddleware, resetGame);

module.exports = router;
