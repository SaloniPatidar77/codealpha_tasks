import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { getUserKey } from "@/lib/storage";

export const useCart = () => {
  const context = useContext(CartContext);

  const saveCart = (cart) => {
    const key = getUserKey("cart");
    localStorage.setItem(key, JSON.stringify(cart));
  };

  const loadCart = () => {
    const key = getUserKey("cart");
    return JSON.parse(localStorage.getItem(key) || "[]");
  };

  return { ...context, saveCart, loadCart };
};