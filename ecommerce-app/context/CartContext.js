"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { getUserKey, getUser } from "@/lib/storage";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [key, setKey] = useState(null);

  // 🔥 STEP 1: Detect user on load
  useEffect(() => {
    const user = getUser();

    if (!user?.email) {
      setKey(null);
      setCart([]);
      return;
    }

    const userKey = getUserKey("cart");
    setKey(userKey);

    const saved = localStorage.getItem(userKey);
    setCart(saved ? JSON.parse(saved) : []);
  }, []);

  // 🔥 STEP 2: Listen for login/logout changes
  useEffect(() => {
    const syncUser = () => {
      const user = getUser();

      if (!user?.email) {
        setKey(null);
        setCart([]);
        return;
      }

      const userKey = getUserKey("cart");
      setKey(userKey);

      const saved = localStorage.getItem(userKey);
      setCart(saved ? JSON.parse(saved) : []);
    };

    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  // 🔥 STEP 3: SAVE CART (PER USER)
  useEffect(() => {
    if (!key) return;

    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart, key]);

  // ➕ ADD TO CART
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === product.id);

      if (exist) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ❌ REMOVE
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  // ➕ QTY
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
    );
  };

  // 🧹 CLEAR
  const clearCart = () => {
    if (key) {
      localStorage.removeItem(key);
    }
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);