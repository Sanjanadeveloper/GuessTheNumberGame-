import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const API_BASE = "https://game-q245.onrender.com/api/game";

const Game = () => {
  const { token } = useContext(AuthContext);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(1);
  const [message, setMessage] = useState("");

  const handleGuess = async () => {
    if (!guess) return;
    try {
      const res = await axios.post(
        `${API_BASE}/guess`,
        { guess: Number(guess), attempts },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);

      if (res.data.targetNumber != undefined) {
      console.log("CHEAT: Target number is", res.data.targetNumber);
      }


      if (res.data.correct) {
        setAttempts(1);
      } else {
        setAttempts((prev) => prev + 1);
      }
      setGuess("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error submitting guess");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow text-center">
      <h2 className="text-2xl mb-4">Guess the Number (1 - 100)</h2>
      <input
        type="number"
        min="1"
        max="100"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleGuess}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Submit Guess
      </button>
      <p className="mt-4 text-lg">{message}</p>
      <p className="mt-2 text-sm text-gray-500">Attempts: {attempts}</p>
    </div>
  );
};

export default Game;
