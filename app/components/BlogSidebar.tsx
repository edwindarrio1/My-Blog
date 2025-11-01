"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Home, Info, LogOut, Menu, X, UserCircle, LayoutDashboard } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/app/context/AuthContext";

export default function BlogSidebar() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar visible by default
  const [showProfile, setShowProfile] = useState(false);

  const logoutUser = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  // ✅ Admin navigation handler
  const handleAdminClick = () => {
    if (!user) {
      // Not logged in → go to login page
      router.push("/login");
    } else {
      // Logged in → go to admin dashboard
      router.push("/admin");
    }
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-5 left-5 z-50 bg-indigo-600 text-white p-2 rounded-md shadow-md hover:bg-indigo-700 transition"
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        animate={{ x: isSidebarOpen ? 0 : -260 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white shadow-2xl flex flex-col justify-between z-40"
      >
        {/* Top Section */}
        <div>
          <h2 className="text-2xl font-bold text-center mt-8 mb-10">My Blog</h2>

          <nav className="space-y-3 px-6">
            {/* Home */}
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full text-left"
            >
              <Home size={20} />
              Home
            </button>

            {/* ✅ Admin Dashboard */}
            <button
              onClick={handleAdminClick}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full text-left"
            >
              <LayoutDashboard size={20} />
              Admin Dashboard
            </button>

            {/* About */}
            <button
              onClick={() => router.push("/about")}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full text-left"
            >
              <Info size={20} />
              About
            </button>
          </nav>
        </div>

        {/* Bottom Section - Profile + Logout */}
        {user && (
          <div className="px-6 mb-8">
            {/* Profile Section */}
            <div
              className="flex items-center gap-3 cursor-pointer mb-4 p-2 rounded-lg hover:bg-indigo-700 transition"
              onClick={() => setShowProfile(!showProfile)}
            >
              <UserCircle size={24} />
              <span className="font-medium">{user.displayName || "My Profile"}</span>
            </div>

            {/* Profile Info Popup */}
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-indigo-700 rounded-lg p-3 text-sm shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL || "https://i.pravatar.cc/100"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-indigo-300"
                  />
                  <div>
                    <p className="font-semibold">{user.displayName || "User"}</p>
                    <p className="text-indigo-200 text-xs">{user.email}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Logout Button */}
            <button
              onClick={logoutUser}
              className="flex items-center gap-3 w-full justify-center px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition mt-4"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </motion.aside>
    </>
  );
}
