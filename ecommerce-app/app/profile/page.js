"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Plus,
  LogOut,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState(null);

  const [addresses, setAddresses] = useState([]);

  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!currentUser) {
      router.push("/login");
      return;
    }

    setUser(currentUser);

    const savedAddresses = JSON.parse(
      localStorage.getItem(
        `addresses_${currentUser.email}`
      ) || "[]"
    );

    setAddresses(savedAddresses);
  }, []);

  const addAddress = () => {
    if (!newAddress.trim() || !user) return;

    const updated = [...addresses, newAddress];

    setAddresses(updated);

    localStorage.setItem(
      `addresses_${user.email}`,
      JSON.stringify(updated)
    );

    setNewAddress("");
  };

  const removeAddress = (index) => {
    const updated = addresses.filter(
      (_, i) => i !== index
    );

    setAddresses(updated);

    localStorage.setItem(
      `addresses_${user.email}`,
      JSON.stringify(updated)
    );
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  if (!user) return null;

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-[#02152d] to-slate-900 py-32 px-5">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-white mb-10">
          My Profile
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* USER CARD */}

          <div
            className="
            bg-white/10
            backdrop-blur-xl

            border
            border-white/10

            rounded-3xl

            p-6
            "
          >
            <div className="flex justify-center mb-5">
              <div
                className="
                h-24
                w-24

                rounded-full

                bg-gradient-to-r
                from-cyan-500
                to-blue-600

                flex
                items-center
                justify-center

                text-white
                text-3xl
                font-bold
                "
              >
                {user.name?.charAt(0)?.toUpperCase()}
              </div>
            </div>

            <div className="space-y-4">

              <div className="flex gap-3 items-center text-white">
                <User size={18} />
                {user.name}
              </div>

              <div className="flex gap-3 items-center text-white">
                <Mail size={18} />
                {user.email}
              </div>

              <div className="flex gap-3 items-center text-white">
                <Phone size={18} />
                {user.phone || "Not Added"}
              </div>

            </div>

            <button
              onClick={logout}
              className="
              mt-8

              w-full

              py-3

              rounded-xl

              bg-red-500/20

              text-red-400

              border
              border-red-500/20

              flex
              items-center
              justify-center
              gap-2
              "
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* ADDRESS SECTION */}

          <div
            className="
            lg:col-span-2

            bg-white/10
            backdrop-blur-xl

            border
            border-white/10

            rounded-3xl

            p-6
            "
          >
            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-white">
                Saved Addresses
              </h2>

            </div>

            {/* Add Address */}

            <div className="flex gap-3 mb-6">

              <input
                value={newAddress}
                onChange={(e) =>
                  setNewAddress(e.target.value)
                }
                placeholder="Add New Address"
                className="
                flex-1

                bg-white/5

                border
                border-white/10

                rounded-xl

                px-4
                py-3

                text-white

                placeholder:text-white/40

                focus:outline-none
                focus:border-cyan-400
                "
              />

              <button
                onClick={addAddress}
                className="
                px-5

                rounded-xl

                bg-gradient-to-r
                from-cyan-500
                to-blue-600

                text-white

                flex
                items-center
                gap-2
                "
              >
                <Plus size={18} />
                Add
              </button>

            </div>

            {/* Address Cards */}

            <div className="space-y-4">

              {addresses.length === 0 && (
                <div className="text-gray-400">
                  No Address Added Yet
                </div>
              )}

              {addresses.map((address, index) => (
                <div
                  key={index}
                  className="
                  bg-white/5

                  border
                  border-white/10

                  rounded-2xl

                  p-5

                  flex
                  justify-between
                  items-center
                  "
                >
                  <div className="flex gap-3 items-start">

                    <MapPin
                      size={20}
                      className="text-cyan-400 mt-1"
                    />

                    <p className="text-white">
                      {address}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      removeAddress(index)
                    }
                    className="
                    px-4
                    py-2

                    rounded-lg

                    bg-red-500/20

                    text-red-400
                    "
                  >
                    Remove
                  </button>

                </div>
              ))}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}