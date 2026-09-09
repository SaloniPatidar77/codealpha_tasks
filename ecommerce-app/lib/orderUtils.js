export function updateOrderStatus(orderId, newStatus) {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  const updated = orders.map((order, index) =>
    index === orderId
      ? { ...order, status: newStatus }
      : order
  );

  localStorage.setItem("orders", JSON.stringify(updated));
}