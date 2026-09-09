"use client";

import { useWishlist } from "@/hooks/useWishlist";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-5">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          ❤️ My Wishlist
        </h1>
        <p className="text-gray-500">
          Your saved favorite products
        </p>
      </div>

      {/* EMPTY STATE */}
      {wishlist.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center bg-white p-10 rounded-2xl shadow">
          <div className="text-6xl">💔</div>
          <h2 className="text-xl font-semibold mt-3">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mt-1">
            Start adding products you love
          </p>

          <Link href="/products">
            <button className="mt-5 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800">
              Browse Products
            </button>
          </Link>
        </div>
      ) : (
        /* GRID */
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >

              {/* IMAGE */}
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full object-contain p-4 hover:scale-105 transition"
                />
              </div>

              {/* DETAILS */}
              <div className="p-4">

                <h2 className="font-semibold text-gray-800 line-clamp-1">
                  {item.name}
                </h2>

                <p className="text-green-600 font-bold mt-1">
                  ₹{item.price}
                </p>

                {/* BUTTONS */}
                <div className="flex gap-2 mt-4">

                  <Link href={`/products/${item.id}`} className="flex-1">
                    <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 text-sm">
                      View
                    </button>
                  </Link>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 text-sm"
                  >
                    Remove
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}