import Link from "next/link";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaTwitter
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-10">
      <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">ElectroStore</h2>
          <p className="text-gray-400 mt-2">
            Best electronics store with modern UI
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <div className="flex flex-col gap-2 text-gray-400">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>

          <p className="flex items-center gap-2 text-gray-400">
            <MapPin size={16} /> Indore, India
          </p>

          <p className="flex items-center gap-2 text-gray-400">
            <Phone size={16} /> +91 000900000
          </p>

          <p className="flex items-center gap-2 text-gray-400">
            <Mail size={16} /> support@electrostore.com
          </p>
        </div>
      </div>

      {/* Social Icons */}
      <div className="border-t border-gray-800 py-4 flex justify-center gap-6 text-xl">
        <a href="#" className="hover:text-pink-500">
          <FaInstagram />
        </a>

        <a href="#" className="hover:text-blue-400">
          <FaLinkedin />
        </a>

        <a href="#" className="hover:text-gray-400">
          <FaGithub />
        </a>

        <a href="#" className="hover:text-sky-400">
          <FaTwitter />
        </a>
      </div>

      <p className="text-center text-gray-500 text-sm py-3">
        © 2026 ElectroStore
      </p>
    </footer>
  );
}