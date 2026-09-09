"use client";

import { useState, useEffect } from "react";

export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);

  const getUser = () => {
    if (typeof window === "undefined") return null;
    const u = localStorage.getItem("currentUser");
    return u ? JSON.parse(u) : null;
  };

  const getKey = () => {
    const user = getUser();
    return user ? `wishlist_${user.email}` : null;
  };

  // LOAD
  useEffect(() => {
    const key = getKey();
    if (!key) return;

    const data = localStorage.getItem(key);
    setWishlist(data ? JSON.parse(data) : []);
  }, []);

  // SAVE
  const saveWishlist = (items) => {
    const key = getKey();
    if (!key) return;

    localStorage.setItem(key, JSON.stringify(items));
    setWishlist(items);
  };

  // ADD
  const addToWishlist = (product) => {
    const exists = wishlist.find((i) => i.id === product.id);
    if (!exists) {
      saveWishlist([...wishlist, product]);
    }
  };

  // REMOVE
  const removeFromWishlist = (id) => {
    saveWishlist(wishlist.filter((i) => i.id !== id));
  };

  return { wishlist, addToWishlist, removeFromWishlist };
}