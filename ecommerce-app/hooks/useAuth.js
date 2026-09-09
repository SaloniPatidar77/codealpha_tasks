"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("currentUser");
    if (data) setUser(JSON.parse(data));
  }, []);

  const login = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return { user, login, logout };
}