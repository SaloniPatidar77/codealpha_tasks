"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { getUser } from "@/lib/storage";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  // Load user + addresses
  useEffect(() => {
    const user = getUser();

    if (!user?.email) {
      router.push("/login");
      return;
    }

    const savedAddresses = JSON.parse(
      localStorage.getItem(`addresses_${user.email}`) || "[]"
    );

    setAddresses(savedAddresses);

    if (savedAddresses.length > 0) {
      setSelectedAddress(savedAddresses[0]);
    }
  }, []);

  // PRICE CALCULATION
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const finalTotal = subtotal - discount;

  // COUPON
  const applyCoupon = () => {
    const code = coupon.toUpperCase();

    if (code === "SAVE20") {
      setDiscount(subtotal * 0.2);
      setCouponMessage("✅ 20% Discount Applied");
    } else if (code === "WELCOME10") {
      setDiscount(subtotal * 0.1);
      setCouponMessage("✅ 10% Discount Applied");
    } else if (code === "FIRST50") {
      setDiscount(50);
      setCouponMessage("✅ ₹50 Discount Applied");
    } else {
      setDiscount(0);
      setCouponMessage("❌ Invalid Coupon");
    }
  };

  // PLACE ORDER
  const placeOrder = () => {
    const user = getUser();

    if (!user?.email) {
      alert("Login Required");
      return;
    }

    if (!selectedAddress) {
      alert("Select Address");
      return;
    }

    if (!cart.length) {
      alert("Cart Empty");
      return;
    }

    // ⭐ IMPORTANT FIX: SAME KEY FOR ALL PAGES
    const key = "orders";

    const order = {
      id: Date.now(),

      customer: {
        name: user.name || user.email,
        address: selectedAddress,
        phone: user.phone || "N/A",
      },

      items: cart,
      paymentMethod,
      coupon,
      discount,
      total: finalTotal,
      status: "Placed",
      date: new Date().toISOString(),
    };

    const prevOrders = JSON.parse(localStorage.getItem(key) || "[]");

    localStorage.setItem(key, JSON.stringify([...prevOrders, order]));

    clearCart();

    router.push("/orders");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-[#02152d] to-slate-900 py-32 px-5">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-white mb-10">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT */}
          <div className="space-y-6">

            {/* ADDRESS */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

              <h2 className="text-2xl text-white font-bold mb-5">
                Delivery Address
              </h2>

              {addresses.length === 0 ? (
                <p className="text-red-400">No Address Found</p>
              ) : (
                addresses.map((address, index) => (
                  <label key={index} className="block mb-3 text-white">
                    <input
                      type="radio"
                      checked={selectedAddress === address}
                      onChange={() => setSelectedAddress(address)}
                      className="mr-2"
                    />
                    {address}
                  </label>
                ))
              )}

            </div>

            {/* COUPON */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

              <h2 className="text-2xl text-white font-bold mb-5">
                Coupon Code
              </h2>

              <div className="flex gap-3">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  placeholder="SAVE20"
                />

                <button
                  onClick={applyCoupon}
                  className="px-5 bg-blue-600 text-white rounded-xl"
                >
                  Apply
                </button>
              </div>

              {couponMessage && (
                <p className="mt-2 text-sm text-green-400">
                  {couponMessage}
                </p>
              )}
            </div>

            {/* PAYMENT */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

              <h2 className="text-2xl text-white font-bold mb-5">
                Payment Method
              </h2>

              {["COD", "UPI", "CARD", "NETBANKING"].map((type) => (
                <label key={type} className="block text-white mb-2">
                  <input
                    type="radio"
                    checked={paymentMethod === type}
                    onChange={() => setPaymentMethod(type)}
                    className="mr-2"
                  />
                  {type}
                </label>
              ))}

            </div>

          </div>

          {/* RIGHT */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-fit">

            <h2 className="text-2xl text-white font-bold mb-5">
              Order Summary
            </h2>

            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-white mb-2">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <hr className="my-4 border-white/20" />

            <p className="text-white">Subtotal: ₹{subtotal}</p>
            <p className="text-green-400">Discount: -₹{discount}</p>
            <p className="text-white font-bold text-xl mt-2">
              Total: ₹{finalTotal}
            </p>

            <button
              onClick={placeOrder}
              className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl font-bold"
            >
              Place Order
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}