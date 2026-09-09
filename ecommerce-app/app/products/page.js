"use client";

import { useState } from "react";
import { products } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import { useSearch } from "@/hooks/useSearch";

// ✅ REAL INDUSTRY ICONS
import {
  ShoppingBag,
  Headphones,
  Smartphone,
  Laptop,
  Watch,
  Speaker,
  Tv,
  Camera,
  Tablet,
  Gamepad2,
  Home
} from "lucide-react";

const categories = [
  { name: "all", icon: ShoppingBag },
  { name: "headphones", icon: Headphones },
  { name: "phones", icon: Smartphone },
  { name: "laptop", icon: Laptop },
  { name: "watch", icon: Watch },
  { name: "speaker", icon: Speaker },
  { name: "tv", icon: Tv },
  { name: "camera", icon: Camera },
  { name: "tablet", icon: Tablet },
  { name: "gaming", icon: Gamepad2 },
  { name: "appliances", icon: Home },
];

export default function ProductsPage() {
  const { search } = useSearch();
  const [selected, setSelected] = useState("all");

  // 🔥 FILTER LOGIC
  const filtered = products.filter((p) => {
    const matchSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      selected === "all" || p.category === selected;

    return matchSearch && matchCategory;
  });

  return (
    <div className="p-5 max-w-7xl mx-auto">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6">
        All Products
      </h1>

      {/* CATEGORY BAR (PROFESSIONAL) */}
      <div className="flex gap-6 overflow-x-auto mb-8 pb-2">
        {categories.map((cat) => {
          const Icon = cat.icon;

          return (
            <div
              key={cat.name}
              onClick={() => setSelected(cat.name)}
              className={`flex flex-col items-center cursor-pointer transition min-w-[70px]
                ${
                  selected === cat.name
                    ? "text-black font-semibold scale-110"
                    : "text-gray-400 hover:text-black"
                }`}
            >
              <Icon size={22} />
              <p className="text-xs capitalize mt-1">
                {cat.name}
              </p>
            </div>
          );
        })}
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No products found
        </p>
      )}
    </div>
  );
}