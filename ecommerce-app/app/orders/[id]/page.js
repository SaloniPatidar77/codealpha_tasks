"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const steps = ["Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");

    const found = orders.find((o) => String(o.id) === String(id));

    setOrder(found || null);
  }, [id]);

  if (!order) return <h2>Order Not Found</h2>;

  const current = steps.indexOf(order.status);

  return (
    <div className="p-5">
      <h1>Track Order #{order.id}</h1>

      {steps.map((s, i) => (
        <p key={s} style={{ color: i <= current ? "green" : "gray" }}>
          {s}
        </p>
      ))}

      <hr />

      <p>{order.customer.name}</p>
      <p>{order.customer.address}</p>
      <p>{order.customer.phone}</p>
    </div>
  );
}