"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    if (!method) {
      alert("Please select a payment method");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/order-success");
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">💳 Payment</h1>

      <div className="space-y-4">

        {/* UPI */}
        <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            onChange={() => setMethod("upi")}
          />
          <div>
            <p className="font-medium">UPI Payment</p>
            <p className="text-xs text-gray-500">Pay using GPay / PhonePe / Paytm</p>
          </div>
        </label>

        {/* CARD */}
        <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            onChange={() => setMethod("card")}
          />
          <div>
            <p className="font-medium">Debit / Credit Card</p>
            <p className="text-xs text-gray-500">Visa, MasterCard supported</p>
          </div>
        </label>

        {/* COD */}
        <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            onChange={() => setMethod("cod")}
          />
          <div>
            <p className="font-medium">Cash on Delivery</p>
            <p className="text-xs text-gray-500">Pay when product arrives</p>
          </div>
        </label>
      </div>

      <button
        onClick={handlePay}
        disabled={loading}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
      >
        {loading ? "Processing Payment..." : "Pay Now"}
      </button>
    </div>
  );
}