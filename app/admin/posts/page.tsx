"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllPosts, deletePostById } from "@/lib/firestorePosts";
import AdminSidebar from "@/app/components/AdminSidebar";

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const list = await getAllPosts();
      setPosts(list);
    } catch (err) {
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await deletePostById(id);
    loadPosts();
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 relative">
      {/* ✅ Sidebar */}
      <AdminSidebar />

      {/* ✅ Main content */}
      <main className="flex-1 md:ml-64 p-8 transition-all duration-300">
        <div className="backdrop-blur-xl bg-white/80 border border-indigo-100 shadow-2xl rounded-2xl p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-4xl font-extrabold text-indigo-700">
              📝 Manage Blog Posts
            </h1>

            <Link
              href="/admin/posts/new"
              className="mt-4 md:mt-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:scale-105 hover:from-indigo-700 hover:to-purple-700 transition-transform"
            >
              + New Post
            </Link>
          </div>

          {/* ✅ Table */}
          <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-100/70">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-800 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-800 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-800 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Loading posts...
                    </td>
                  </tr>
                ) : posts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No posts found
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-indigo-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-800 font-medium">
                        {post.title}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {post.views || 0}
                      </td>
                      <td className="px-6 py-4 space-x-4">
                        <button
                          onClick={() => deletePost(post.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                        <Link
                          href={`/post/${post.id}`}
                          className="text-indigo-600 hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
