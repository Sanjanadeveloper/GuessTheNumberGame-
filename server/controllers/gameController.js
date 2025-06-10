const Score = require("../models/Score");

// This should be random per game/session in a real app,
// but for simplicity, we'll generate it server-side and store in memory.
let targetNumber = Math.floor(Math.random() * 100) + 1;

// Reset target number for a user (optional route)
const resetGame = (req, res) => {
  targetNumber = Math.floor(Math.random() * 100) + 1;
  res.json({ message: "Game reset, new number generated" });
};

// Handle guess submission
const submitGuess = async (req, res) => {
  const userId = req.user.id;
  const { guess, attempts } = req.body;

  if (!guess || !attempts) {
    return res.status(400).json({ message: "Guess and attempts are required" });
  }

  if (guess < 1 || guess > 100) {
    return res.status(400).json({ message: "Guess must be between 1 and 100" });
  }

  if (guess === targetNumber) {
    try {
      // Save score (attempts) in DB
      await Score.create({ user: userId, attempts });

      // Generate new number for next game
      targetNumber = Math.floor(Math.random() * 100) + 1;
      
;
      return res.json({ message: "Correct! You guessed the number.", correct: true });
    } catch (error) {
      return res.status(500).json({ message: "Server error saving score" });
    }
  } else if (guess < targetNumber) {
    return res.json({ message: "Too low", correct: false, targetNumber });
  } else {
    return res.json({ message: "Too high", correct: false, targetNumber });
  }
};

// Get top 10 leaderboard (lowest attempts)
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Score.find()
      .sort({ attempts: 1, date: 1 })
      .limit(10)
      .populate("user", "username");

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching leaderboard" });
  }
};


module.exports = { submitGuess, getLeaderboard, resetGame};
