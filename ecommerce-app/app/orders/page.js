"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(data.reverse());
  }, []);

  if (!orders.length) {
    return <h2>No Orders Found</h2>;
  }

  return (
    <div className="p-20">
      <h1>My Orders</h1>

      {orders.map((o) => (
        <div key={o.id} className="border p-3 mt-3">
          <p><b>{o.customer.name}</b></p>
          <p>Status: {o.status}</p>
          <p>Total: ₹{o.total}</p>

          <Link href={`/orders/${o.id}`}>
            <button className="text-blue-600">Track</button>
          </Link>
        </div>
      ))}
    </div>
  );
}