"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderSuccess() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrder(allOrders[allOrders.length - 1] || null);
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">No Order Found 😢</h1>
        <Link href="/products">
          <button className="mt-4 bg-black text-white px-4 py-2 rounded">
            Shop Now
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Order Confirmed
      </h1>

      <div className="border p-4 rounded">
        <p><b>Name:</b> {order.customer.name}</p>
        <p><b>Address:</b> {order.customer.address}</p>
        <p><b>Phone:</b> {order.customer.phone}</p>
      </div>

      <div className="mt-5">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between border-b py-2">
            <p>{item.name} × {item.quantity}</p>
            <p>₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-4">
        Total: ₹{order.total}
      </h2>

      <Link href="/orders">
        <button className="mt-5 bg-black text-white px-4 py-2 rounded">
          View Orders
        </button>
      </Link>
    </div>
  );
}