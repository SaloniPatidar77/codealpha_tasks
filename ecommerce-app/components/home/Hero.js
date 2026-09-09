"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const gadgets = [
{
image: "/images/phone.png",
title: "Smartphones",
desc: "Latest flagship devices with cutting-edge technology.",
},
{
image: "/images/laptop.png",
title: "Laptops",
desc: "Powerful performance for work, gaming and creativity.",
},
{
image: "/images/watch.png",
title: "Smart Watches",
desc: "Stay connected and track your fitness effortlessly.",
},
{
image: "/images/headphones.png",
title: "Headphones",
desc: "Immersive sound experience with premium quality.",
},
];

export default function Hero() {
const [current, setCurrent] = useState(0);

useEffect(() => {
const interval = setInterval(() => {
setCurrent((prev) => (prev + 1) % gadgets.length);
}, 3500);


return () => clearInterval(interval);

}, []);

const scrollToProducts = () => {
const section = document.getElementById("products");


if (section) {
  section.scrollIntoView({
    behavior: "smooth",
  });
}


};

return ( <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950  via-[#02152d] to-slate-900 flex items-center justify-center pt-24">


  {/* Background Glow */}
  <div className="absolute w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[180px]" />

  <div className="absolute right-0 top-20 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[140px]" />

  <div className="absolute left-0 bottom-0 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[120px]" />

  <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">

    {/* LEFT */}
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="z-10"
    >
      <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm backdrop-blur-xl">
        premium Shopping
      </span>

      <h1 className="mt-6 text-4xl md:text-7xl font-bold text-white leading-tight">
        Experience The
        <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Shopping
        </span>
      </h1>

      <p className="mt-6 text-gray-400 text-lg max-w-xl leading-relaxed">
        Discover premium electronics crafted for innovation,
        performance and lifestyle. Explore smartphones,
        laptops, smart watches and immersive audio devices.
      </p>

      <div className="flex gap-4 mt-8">
        <button
          onClick={scrollToProducts}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-800 text-white font-semibold hover:scale-105 transition"
        >
          Shop Now
        </button>

        <button className="px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition">
          Explore
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-10 mt-12 flex-wrap">

        <div>
          <h3 className="text-3xl font-bold text-white">
            10K+
          </h3>
          <p className="text-gray-400 text-sm">
            Happy Customers
          </p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-white">
            500+
          </h3>
          <p className="text-gray-400 text-sm">
            Premium Products
          </p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-white">
            4.9★
          </h3>
          <p className="text-gray-400 text-sm">
            Customer Rating
          </p>
        </div>

      </div>
    </motion.div>

    {/* RIGHT */}
    <div className="relative flex justify-center items-center h-[650px]">

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[500px] h-[500px] border border-cyan-500/20 rounded-full"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[380px] h-[380px] border border-blue-500/20 rounded-full"
      />

      <AnimatePresence mode="wait">

        <motion.div
          key={current}
          initial={{
            opacity: 0,
            x: 500,
            rotateY: 90,
            scale: 0.7,
          }}
          animate={{
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            y: [0, -25, 0],
            rotate: [0, 2, 0, -2, 0],
          }}
          exit={{
            opacity: 0,
            x: -500,
            rotateY: -90,
            scale: 0.7,
          }}
          transition={{
            duration: 1,
          }}
          className="relative"
          style={{
            transformStyle: "preserve-3d",
          }}
        >

          <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full" />

          <div className="absolute top-10 right-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2 text-white text-sm z-30">
            🔥 Best Seller
          </div>

          <img
            src={gadgets[current].image}
            alt={gadgets[current].title}
            className="relative z-10 w-[500px] md:w-[600px] object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)]"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-white/10 border border-white/20 px-8 py-4 rounded-2xl text-center z-20"
          >
            <h3 className="text-white text-xl font-bold">
              {gadgets[current].title}
            </h3>

            <p className="text-gray-300 text-sm mt-1 max-w-xs">
              {gadgets[current].desc}
            </p>
          </motion.div>

        </motion.div>

      </AnimatePresence>

      <div className="absolute bottom-5 flex gap-3">
        {gadgets.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              current === index
                ? "w-10 bg-cyan-400"
                : "w-3 bg-white/30"
            }`}
          />
        ))}
      </div>

    </div>
  </div>
</section>

);
}
