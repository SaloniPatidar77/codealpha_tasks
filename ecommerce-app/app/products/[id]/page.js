"use client";

import { useParams } from "next/navigation";
import { products } from "@/lib/data";
import { useCart } from "@/hooks/useCart";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id == id);

  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">

      <div className="grid md:grid-cols-2 gap-10">

        {/* Image */}
        <img
          src={product.image}
          className="w-full h-80 object-contain bg-gray-100 p-5"
        />

        {/* Details */}
        <div>

          <h1 className="text-3xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-xl text-green-600 mb-4">
            ₹{product.price}
          </p>

          <p className="mb-6 text-gray-600">
            This is a high-quality product with best performance and durability.
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-5 py-2 rounded"
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}