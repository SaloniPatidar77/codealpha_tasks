"use client";

import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded text-white z-50
      ${type === "success" ? "bg-green-600" : ""}
      ${type === "error" ? "bg-red-600" : ""}
      ${type === "info" ? "bg-blue-600" : ""}`}
    >
      {message}
    </div>
  );
}