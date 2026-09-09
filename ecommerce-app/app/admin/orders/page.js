"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("orders") || "[]"));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Orders</h1>

      {orders.map((o) => (
        <div key={o.id} className="border p-3 mb-3">
          <p><b>{o.customer?.name}</b></p>
          <p>₹{o.total}</p>
          <p>Status: {o.status}</p>
        </div>
      ))}
    </div>
  );
}