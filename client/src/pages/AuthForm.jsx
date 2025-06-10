import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const API_BASE = "https://game-q245.onrender.com/api/auth";

const AuthForm = () => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "login" : "register";
      // Send username and password to backend
      const res = await axios.post(`${API_BASE}/${endpoint}`, { username, password });

      if (isLogin) {
        // Assuming backend returns { token, username }
        login({ username: res.data.username || username }, res.data.token);
        navigate("/game");
      } else {
        setMessage("Registration successful! You can now login.");
        setIsLogin(true);
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>

        {message && <p className="text-red-500 mb-2">{message}</p>}

        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="bg-gray-500 text-white py-2 w-full rounded">
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="mt-3 text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
            className="text-gray-500 cursor-pointer"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
