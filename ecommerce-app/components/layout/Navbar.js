"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useSearch } from "@/hooks/useSearch";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingCart, User, Search, LogOut } from "lucide-react";

export default function Navbar() {
  const { cart } = useCart();
  const { search, setSearch } = useSearch();

  const [user, setUser] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  
  useEffect(() => {
    const syncUser = () => {
      const u = localStorage.getItem("currentUser");
      setUser(u ? JSON.parse(u) : null);
    };

    syncUser();

    window.addEventListener("storage", syncUser);
    window.addEventListener("focus", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("focus", syncUser);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    router.push("/");
  };

  // ✅ ADMIN PAGE PE NAVBAR HIDE
  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-5">
      <nav className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between bg-black/25 backdrop-blur-2xl border border-white/10 rounded-2xl">

        {/* LOGO */}
        <Link href="/" className="flex flex-col">
          <h1 className="text-2xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text">
            NEXORA
          </h1>
          <span className="text-[9px] text-white/40 tracking-[3px]">
            PREMIUM ELECTRONICS
          </span>
        </Link>

        {/* LINKS */}
        <div className="hidden lg:flex gap-6 text-white/70">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/orders">Orders</Link>
        </div>

        {/* SEARCH */}
        <div className="hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-white/40" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-[250px] h-10 bg-white/5 border border-white/10 rounded-full pl-10 text-white"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* CART */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="text-white" />
            <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          </Link>

          {/* LOGIN / USER */}
          {!user ? (
            <>
              <Link href="/auth/login" className="text-white/70">Login</Link>
              <Link href="/auth/signup" className="px-3 py-1 bg-blue-600 text-white rounded-full">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile">
                <User className="text-white" />
              </Link>

              <button onClick={logout}>
                <LogOut className="text-white" />
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}