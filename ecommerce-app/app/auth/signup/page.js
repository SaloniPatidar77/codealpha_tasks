"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    const exists = users.find((u) => u.email === form.email);

    if (exists) {
      alert("User already exists");
      return;
    }

    users.push({
      ...form,
      id: Date.now(),
      role: "user", // 🔥 FIXED ALWAYS USER
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful");
    router.push("/auth/login");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>

      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <input name="name" placeholder="Full Name" onChange={handleChange} className="border p-2 rounded" />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} className="border p-2 rounded" />
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded" />
        <input name="password" type="password" onChange={handleChange} className="border p-2 rounded" />

        <button className="bg-blue-600 text-white p-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}