"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("users") || "[]");
    const o = JSON.parse(localStorage.getItem("orders") || "[]");

    setUsers(u.filter((x) => x.role === "user"));
    setOrders(o);
  }, []);

  const deleteUser = (id) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const updateStatus = (orderId, status) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status } : o
    );

    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Manage users & orders</p>
      </div>

      {/* USERS */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Users ({users.length})
        </h2>

        {users.map((u) => (
          <div
            key={u.id}
            className="flex justify-between border-b py-2"
          >
            <div>
              <p className="font-semibold">{u.name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
            </div>

            <button
              onClick={() => deleteUser(u.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ORDERS */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Orders ({orders.length})
        </h2>

        {orders.map((o) => (
          <div key={o.id} className="border p-3 rounded mb-3">

            <p className="font-semibold">
              {o.customer?.name}
            </p>

            <p className="text-sm text-gray-500">
              ₹{o.total}
            </p>

            <p className="mt-1">
              Status:{" "}
              <b className="text-blue-600">{o.status}</b>
            </p>

            {/* STATUS UPDATE BUTTONS */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => updateStatus(o.id, "Packed")}
                className="px-2 py-1 bg-yellow-400 text-white text-sm rounded"
              >
                Packed
              </button>

              <button
                onClick={() => updateStatus(o.id, "Shipped")}
                className="px-2 py-1 bg-blue-500 text-white text-sm rounded"
              >
                Shipped
              </button>

              <button
                onClick={() => updateStatus(o.id, "Delivered")}
                className="px-2 py-1 bg-green-500 text-white text-sm rounded"
              >
                Delivered
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}