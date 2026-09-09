import "./globals.css";
import ToastProvider from "@/components/ui/ToastProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";


export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CartProvider>
          <SearchProvider>
            <ToastProvider>
            

              <Navbar />

              {/* 🔥 FIX: THIS IS REQUIRED */}
              <main className="pt-23, background-dark-blue">
                {children}
              </main>

              <Footer />

            </ToastProvider>
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}