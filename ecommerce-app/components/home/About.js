"use client";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#020617] to-black text-white py-20 px-6">

      {/* ABOUT HEADER */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          About Nexora
        </h2>

        <p className="text-gray-300 mt-6 text-lg leading-relaxed">
          Nexora is a next-generation e-commerce platform built to deliver
          premium electronics at unbeatable prices. We focus on quality, speed,
          and trust to ensure a world-class shopping experience for every customer.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center mb-20">

        {[
          { num: "5000+", label: "Happy Customers" },
          { num: "500+", label: "Products Listed" },
          { num: "24/7", label: "Customer Support" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:scale-105 transition shadow-lg"
          >
            <h3 className="text-4xl font-bold text-cyan-400">
              {item.num}
            </h3>
            <p className="text-gray-300 mt-2">{item.label}</p>
          </div>
        ))}

      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">
          Why Choose Us
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {[
            { icon: "🚚", title: "Fast Delivery", desc: "Doorstep delivery in record time" },
            { icon: "🔒", title: "Secure Payment", desc: "100% safe transactions" },
            { icon: "🔁", title: "Easy Returns", desc: "Hassle-free return policy" },
            { icon: "⭐", title: "Trusted Quality", desc: "Only verified products" },
          ].map((f, i) => (
            <div
              key={i}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center hover:border-cyan-400/50 hover:scale-105 transition"
            >
              <div className="text-4xl group-hover:scale-125 transition">
                {f.icon}
              </div>

              <h4 className="font-semibold mt-3 text-lg">
                {f.title}
              </h4>

              <p className="text-sm text-gray-400 mt-2">
                {f.desc}
              </p>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}