import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://game-q245.onrender.com/api/auth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = isLogin ? `${API_BASE}/login` : `${API_BASE}/register`;
      const res = await axios.post(url, formData);

      if (isLogin) {
        login(res.data.token); // store token in context + localStorage
        navigate("/game");
      } else {
        alert("Registration successful! You can now login.");
        setIsLogin(true);
        setFormData({ username: "", password: "" });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            required
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </div>

        <p className="text-sm mt-4 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-gray-600 hover:underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
