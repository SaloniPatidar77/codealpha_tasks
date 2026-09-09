"use client";
import Button from "@/components/ui/Button";

export default function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <div className="flex justify-between items-center border p-4 mb-2 bg-white rounded">
      <div>
        <h3 className="font-semibold">{item.title}</h3>
        <p>₹{item.price}</p>
      </div>
      <div className="flex gap-2 items-center">
        <Button onClick={() => onDecrement(item)}>-</Button>
        <span>{item.quantity}</span>
        <Button onClick={() => onIncrement(item)}>+</Button>
        <Button onClick={() => onRemove(item)} className="bg-red-500 hover:bg-red-600">
          Remove
        </Button>
      </div>
    </div>
  );
}