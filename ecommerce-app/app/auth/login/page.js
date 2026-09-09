"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ ADMIN LOGIN
    if (email === "admin@gmail.com" && password === "admin123") {
      const adminUser = {
        name: "Admin",
        email,
        role: "admin",
      };

      localStorage.setItem("currentUser", JSON.stringify(adminUser));
      router.push("/admin");
      return;
    }

    // USER LOGIN
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({ ...found, role: "user" })
    );

    router.push("/");
  };

  return (
    <div className="p-30 max-w-md mx-auto">
      <h1>Login</h1>

      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}