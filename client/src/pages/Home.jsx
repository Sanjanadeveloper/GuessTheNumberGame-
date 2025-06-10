import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-blue-100 text-center px-4">
      <h1 className="text-4xl font-bold mb-4">🎮 Welcome to Guess the Number!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Test your luck and logic. Try to guess the secret number between 1 and 100!
      </p>
      <div className="flex gap-4">
        <Link
          to="/auth"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Login / Signup
        </Link>
      </div>
    </div>
  );
};

export default Home;
