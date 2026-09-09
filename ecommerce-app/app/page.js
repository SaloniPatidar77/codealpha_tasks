"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import { products } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import SplashScreen from "@/components/SplashScreen";
import { useSearch } from "@/hooks/useSearch";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  const { search } = useSearch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 sec splash

    return () => clearTimeout(timer);
  }, []);

  // Search Filter
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Group By Category
  const grouped = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }

    acc[product.category].push(product);
    return acc;
  }, {});

  // Show Splash Screen First
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div>
      <Hero />

      <section id="products" className="p-5"></section>

      <section className="p-5">
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Products
        </h2>

        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-14">
            {/* Category Title */}
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold mb-5 border-b capitalize"
            >
              {category}
            </motion.h3>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {items.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{
                    opacity: 0,
                    x: 120,
                    scale: 0.9,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-4">
              <Link href="/products">
                <button className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition">
                  View All
                </button>
              </Link>
            </div>
          </div>
        ))}

        {/* No Products */}
        {filteredProducts.length === 0 && (
          <p className="text-center mt-5 text-red-500">
            No products found
          </p>
        )}
      </section>

      <About />
    </div>
  );
}