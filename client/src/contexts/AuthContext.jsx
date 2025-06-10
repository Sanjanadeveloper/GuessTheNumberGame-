import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Create the provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  // Keep token in localStorage in sync
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
