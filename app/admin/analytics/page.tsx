"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { Eye, FileText, Users } from "lucide-react";
import AdminSidebar from "@/app/components/AdminSidebar";

// --------------------- Types ---------------------
type Post = {
  id: string;
  title: string;
  content?: string;
  views?: number;
  createdAt?: Timestamp;
};

// --------------------- Component ---------------------
export default function AnalyticsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    async function loadData() {
      const querySnap = await getDocs(collection(db, "posts"));

      const postData: Post[] = querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Post));

      const viewsSum = postData.reduce((sum, p) => sum + (p.views || 0), 0);

      setPosts(postData);
      setTotalViews(viewsSum);
    }

    loadData();
  }, []);

  const topPosts = [...posts]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Sidebar */}
      <div className="w-64 fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-sm z-20">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-800 mb-8 text-center"
        >
          📊 Blog Analytics Dashboard
        </motion.h1>

        {/* Overview Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-10">
          <StatCard
            icon={<FileText className="text-indigo-600 w-8 h-8" />}
            label="Total Posts"
            value={posts.length}
          />
          <StatCard
            icon={<Eye className="text-purple-600 w-8 h-8" />}
            label="Total Views"
            value={totalViews.toLocaleString()}
          />
          <StatCard
            icon={<Users className="text-pink-600 w-8 h-8" />}
            label="Avg Views / Post"
            value={
              posts.length > 0
                ? Math.round(totalViews / posts.length).toLocaleString()
                : "0"
            }
          />
        </div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 max-w-6xl mx-auto mb-10"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            📈 Views per Blog Post
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={posts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Table */}
        <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold px-6 py-4 border-b text-gray-800">
            📋 Top Viewed Blog Posts
          </h2>
          <table className="w-full text-left border-collapse">
            <thead className="bg-indigo-50 text-indigo-800">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Views</th>
                <th className="px-6 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post) => (
                <tr
                  key={post.id}
                  className="border-t hover:bg-indigo-50 transition"
                >
                  <td className="px-6 py-3 font-medium text-gray-700">
                    {post.title}
                  </td>
                  <td className="px-6 py-3 text-indigo-600 font-semibold">
                    {post.views || 0}
                  </td>
                  <td className="px-6 py-3 text-gray-500">
                    {post.createdAt
                      ? new Date(post.createdAt.seconds * 1000).toDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

// --------------------- Stat Card ---------------------
function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center border border-gray-200 hover:border-indigo-300 transition-all"
    >
      <div className="mb-3">{icon}</div>
      <h3 className="text-lg font-medium text-gray-600">{label}</h3>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </motion.div>
  );
}
