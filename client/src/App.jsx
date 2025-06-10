import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";

import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import Home from "./pages/Home"; // ✅ Newly added

// ✅ Private Route Wrapper
function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/auth" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthForm />} />

          {/* Protected Routes */}
          <Route
            path="/game"
            element={
              <PrivateRoute>
                <Game />
              </PrivateRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <PrivateRoute>
                <Leaderboard />
              </PrivateRoute>
            }
          />

          {/* Catch unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
