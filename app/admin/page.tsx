"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, PlusCircle, Eye } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import AdminSidebar from "@/app/components/AdminSidebar";

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 text-white text-lg font-semibold">
        ⚠️ Please log in to access the Admin Dashboard.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col items-center justify-center px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-gray-800 mb-6 text-center"
        >
          Welcome, <span className="text-indigo-600">{user.email}</span> 👋
        </motion.h1>

        <p className="text-gray-600 mb-12 text-center text-lg max-w-2xl">
          Manage your posts and analytics all in one place.
        </p>

        {/* Dashboard Cards */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md p-8 text-center border hover:border-indigo-300 transition-all cursor-pointer hover:shadow-xl"
            onClick={() => router.push("/admin/posts")}
          >
            <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Manage Posts</h3>
            <p className="text-gray-500 text-sm">
              View and edit blog posts easily.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md p-8 text-center border hover:border-indigo-300 transition-all cursor-pointer hover:shadow-xl"
            onClick={() => router.push("/admin/posts/new")}
          >
            <PlusCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Create Post</h3>
            <p className="text-gray-500 text-sm">
              Write and publish new articles.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md p-8 text-center border hover:border-indigo-300 transition-all cursor-pointer hover:shadow-xl"
            onClick={() => router.push("/admin/analytics")}
          >
            <Eye className="w-12 h-12 text-pink-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-gray-500 text-sm">
              Track views and engagement across all posts.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
