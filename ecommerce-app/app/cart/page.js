"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  useRequireAuth();

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("currentUser");
    if (data) setUser(JSON.parse(data));
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* EMPTY CART */
  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#02152d] to-slate-900 flex items-center justify-center px-5">
        <div className="text-center">
          <ShoppingBag
            size={80}
            className="mx-auto text-cyan-400 mb-5"
          />

          <h1 className="text-4xl font-bold text-white">
            Your Cart is Empty
          </h1>

          <p className="text-gray-400 mt-3">
            Explore our premium collection.
          </p>

          <Link href="/products">
            <button className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition">
              Browse Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-[#02152d] to-slate-900 px-5 py-32">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h1 className="text-5xl font-bold text-white mb-10">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-5">

            {cart.map((item) => (
              <div
                key={item.id}
                className="
                bg-white/10
                backdrop-blur-xl

                border
                border-white/10

                rounded-3xl

                p-5

                flex
                flex-col
                md:flex-row
                items-center
                justify-between

                gap-5
              "
              >
                {/* Product */}
                <div className="flex items-center gap-5">
                  <div
                    className="
                    h-28
                    w-28

                    bg-white/5

                    rounded-2xl

                    flex
                    items-center
                    justify-center
                  "
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                      h-24
                      w-24
                      object-contain
                    "
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {item.name}
                    </h2>

                    <p className="text-cyan-400 mt-1">
                      ₹{item.price}
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      Premium Electronic Product
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-5">

                  {/* Quantity */}
                  <div
                    className="
                    flex
                    items-center
                    gap-3

                    bg-white/5

                    rounded-full

                    px-3
                    py-2
                  "
                  >
                    <button
                      onClick={() =>
                        decreaseQty(item.id)
                      }
                      className="
                      h-8
                      w-8

                      rounded-full

                      bg-white/10

                      flex
                      items-center
                      justify-center

                      text-white
                    "
                    >
                      <Minus size={16} />
                    </button>

                    <span className="text-white font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty(item.id)
                      }
                      className="
                      h-8
                      w-8

                      rounded-full

                      bg-cyan-500

                      flex
                      items-center
                      justify-center

                      text-white
                    "
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">
                      Subtotal
                    </p>

                    <p className="text-white font-bold text-lg">
                      ₹
                      {item.price *
                        item.quantity}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="
                    h-10
                    w-10

                    rounded-full

                    bg-red-500/20

                    flex
                    items-center
                    justify-center

                    text-red-400

                    hover:bg-red-500/30
                    transition
                  "
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div
              className="
              sticky
              top-28

              bg-white/10
              backdrop-blur-xl

              border
              border-white/10

              rounded-3xl

              p-6
            "
            >
              <h2 className="text-2xl font-bold text-white">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between text-gray-300">
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>

                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between text-white font-bold text-xl">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <Link href="/checkout">
                <button
                  className="
                  w-full

                  mt-8

                  py-4

                  rounded-full

                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600

                  text-white
                  font-semibold

                  hover:scale-[1.02]
                  transition
                "
                >
                  Proceed To Checkout
                </button>
              </Link>

              <Link href="/products">
                <button
                  className="
                  w-full

                  mt-3

                  py-4

                  rounded-full

                  border
                  border-white/10

                  text-white

                  hover:bg-white/5
                  transition
                "
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}