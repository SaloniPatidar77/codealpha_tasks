"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users") || "[]"));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Users</h1>

      {users.map((u, i) => (
        <div key={i} className="p-2 border mb-2">
          {u.name} - {u.email}
        </div>
      ))}
    </div>
  );
}