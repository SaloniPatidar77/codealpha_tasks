"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    alert("Message sent successfully ");

    setForm({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

      {/* LEFT INFO */}
      <div>
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

        <p className="text-gray-600 mb-6">
          We are here to help you with orders, products and support.
        </p>

        <div className="space-y-4 text-gray-700">

          <div className="flex items-center gap-3">
            <Mail />
            support@electrostore.com
          </div>

          <div className="flex items-center gap-3">
            <Phone />
            +91 000900000
          </div>

          <div className="flex items-center gap-3">
            <MapPin />
            Indore, India
          </div>

        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl p-6 shadow-sm"
      >

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full border p-3 rounded mb-3"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full border p-3 rounded mb-3"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="5"
          className="w-full border p-3 rounded mb-3"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
        >
          Send Message
        </button>

      </form>

    </div>
  );
}