"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileText, Eye, PlusCircle, LogOut, Home, Menu, X } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/app/context/AuthContext";

export default function AdminSidebar() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const logoutUser = async () => {
    await signOut(auth);
    window.location.href = "/login";
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
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white shadow-2xl flex flex-col justify-between z-40"
          >
            <div>
              <h2 className="text-2xl font-bold text-center mt-8 mb-10">
                Admin Panel
              </h2>

              <nav className="space-y-3 px-6">
                {[
                  { label: "Home", icon: <Home size={20} />, path: "/admin" },
                  { label: "Posts", icon: <FileText size={20} />, path: "/admin/posts" },
                  { label: "New Post", icon: <PlusCircle size={20} />, path: "/admin/posts/new" },
                  { label: "Analytics", icon: <Eye size={20} />, path: "/admin/analytics" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => router.push(item.path)}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-800 transition w-full text-left"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Logout Button */}
            <div className="px-6 mb-8">
              <button
                onClick={logoutUser}
                className="flex items-center gap-3 w-full justify-center px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
