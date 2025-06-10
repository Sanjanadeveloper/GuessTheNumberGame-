import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const API_BASE = "http://localhost:8080/api/game";

const Leaderboard = () => {
  const { token } = useContext(AuthContext);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`${API_BASE}/leaderboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setScores(res.data);
      } catch (error) {
        console.error("Error fetching leaderboard", error);
      }
    };
    fetchLeaderboard();
  }, [token]);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4 text-center">Leaderboard</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Rank</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Attempts</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, idx) => (
            <tr key={score._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border px-4 py-2 text-center">{idx + 1}</td>
              <td className="border px-4 py-2">{score.user.username}</td>
              <td className="border px-4 py-2 text-center">{score.attempts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
