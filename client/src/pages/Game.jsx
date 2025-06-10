import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080/api/game";

const Game = () => {
  const { token, logout } = useContext(AuthContext);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();

  const handleGuess = async () => {
    if (!guess) return setMessage("Please enter a number!");

    try {
      const res = await axios.post(
        `${API_BASE}/guess`,
        { guess: Number(guess) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAttempts(attempts + 1);
      setMessage(res.data.message);

      if (res.data.correct) {
        setGameOver(true);
      }
    } catch (err) {
      console.error(err);
      if (
        err.response &&
        (err.response.data.message === "Invalid or expired token" ||
          err.response.status === 401)
      ) {
        alert("Session expired. Please login again.");
        logout();
        navigate("/");
      } else {
        setMessage("Something went wrong!");
      }
    }
  };

  const handlePlayAgain = () => {
    setGuess("");
    setMessage("");
    setAttempts(0);
    setGameOver(false);
  };

  const goToLeaderboard = () => {
    navigate("/leaderboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-6">🎯 Guess the Number Game</h1>

      {!gameOver ? (
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="border border-gray-400 px-4 py-2 rounded w-full"
            placeholder="Enter a number (1-100)"
          />
          <button
            onClick={handleGuess}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 w-full"
          >
            Submit Guess
          </button>
          <p className="text-lg text-gray-700">{message}</p>
          <p className="text-sm text-gray-500">Attempts: {attempts}</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl font-semibold text-yellow-600 mb-4">{message}</p>
          <p className="text-gray-700">You guessed it in {attempts} attempts!</p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePlayAgain}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Play Again
            </button>
            <button
              onClick={goToLeaderboard}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              View Leaderboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
