"use client";

import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/components/ui/ToastProvider";
import Link from "next/link";

export default function ProductCard({ product }) {
  const { addToCart, cart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();
  const { showToast } = useToast();

  const isInCart = cart.some((item) => item.id === product.id);
  const isInWishlist = wishlist.some(
    (item) => item.id === product.id
  );

  return (
    <div
      className="
      relative
      group
      h-[430px]
      bg-white
      rounded-3xl
      overflow-hidden
      border
      border-gray-100
      shadow-md
      hover:shadow-2xl
      hover:-translate-y-3
      transition-all
      duration-500
      flex
      flex-col
    "
    >
      {/* HOT BADGE */}

      <div className="absolute top-4 left-4 z-20">
        <span
          className="
          bg-gradient-to-r
          from-red-500
          to-orange-500
          text-white
          text-xs
          font-semibold
          px-3
          py-1
          rounded-full
          shadow-lg
        "
        >
          HOT
        </span>
      </div>

      {/* IMAGE SECTION */}

      <Link href={`/products/${product.id}`}>
        <div
          className="
          h-[220px]
          bg-gradient-to-b
          from-gray-50
          to-white
          flex
          items-center
          justify-center
          overflow-hidden
        "
        >
          <img
            src={product.image}
            alt={product.name}
            className="
              max-h-[170px]
              max-w-[85%]
              object-contain
              transition-all
              duration-500
              group-hover:scale-110
              group-hover:-translate-y-2
            "
          />
        </div>
      </Link>

      {/* CONTENT */}

      <div className="flex flex-col flex-1 p-5">

        <h2
          className="
          text-lg
          font-bold
          text-gray-900
          line-clamp-2
          min-h-[56px]
        "
        >
          {product.name}
        </h2>

        {/* PRICE */}

        <div className="mt-2">
          <span
            className="
            text-2xl
            font-extrabold
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            bg-clip-text
            text-transparent
          "
          >
            ₹{product.price}
          </span>
        </div>

        {/* BUTTONS */}

        <div className="mt-auto pt-5 flex gap-2">

          <button
            onClick={() => {
              addToCart(product);
              showToast("Added to Cart ✔", "success");
            }}
            className={`
              flex-1
              py-3
              rounded-xl
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              ${
                isInCart
                  ? "bg-green-600"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02]"
              }
            `}
          >
            {isInCart ? "✔ Added" : "Add to Cart"}
          </button>

          <button
            onClick={() => {
              addToWishlist(product);
              showToast(
                "Saved to Wishlist ❤️",
                "success"
              );
            }}
            className={`
              w-12
              rounded-xl
              border
              transition-all
              duration-300
              ${
                isInWishlist
                  ? "bg-red-100 border-red-300"
                  : "hover:bg-red-50 hover:border-red-300"
              }
            `}
          >
            {isInWishlist ? "❤️" : "🤍"}
          </button>

          <Link href={`/products/${product.id}`}>
            <button
              className="
              px-4
              py-3
              rounded-xl
              border
              font-medium
              hover:bg-gray-100
              transition-all
              duration-300
            "
            >
              View
            </button>
          </Link>

        </div>
      </div>

      {/* GLOW EFFECT */}

      <div
        className="
        absolute
        inset-0
        opacity-0
        group-hover:opacity-100
        pointer-events-none
        transition-opacity
        duration-500
        bg-gradient-to-t
        from-cyan-500/5
        to-transparent
      "
      />
    </div>
  );
}