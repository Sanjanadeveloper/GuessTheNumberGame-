import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const API_BASE = "http://localhost:8080/api/auth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "login" : "register";
      const res = await axios.post(`${API_BASE}/${endpoint}`, { username, password });

      if (isLogin) {
        login({ username: res.data.username }, res.data.token);
        navigate("/game");  // Redirect after successful login
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
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p
        className="mt-4 text-center text-sm text-gray-600 cursor-pointer"
        onClick={() => {
          setMessage("");
          setIsLogin(!isLogin);
        }}
      >
        {isLogin
          ? "Don't have an account? Register here."
          : "Already have an account? Login here."}
      </p>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default AuthForm;
