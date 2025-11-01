"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/app/components/AdminSidebar"; // ✅ Import reusable sidebar

// ✅ React 19–compatible editor
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function CreatePost() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <p className="text-center mt-10 text-red-600 text-lg font-semibold">
        ⚠️ You must be logged in to create a post.
      </p>
    );
  }

  const submitPost = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content!");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "posts"), {
        title,
        content,
        author: user.email,
        authorId: user.uid,
        createdAt: serverTimestamp(),
      });
      alert("✅ Post published successfully!");
      router.push("/admin/posts");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to publish post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 relative">
      {/* ✅ Sidebar imported from the Admin layout */}
      <AdminSidebar />

      {/* Main Create Post Section */}
      <main className="flex-1 md:ml-64 p-8 transition-all duration-300">
        <div className="backdrop-blur-xl bg-white/80 border border-indigo-100 shadow-2xl rounded-2xl p-8 max-w-4xl mx-auto mt-6">
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center">
            ✍️ Create a New Blog Post
          </h2>

          {/* Title Input */}
          <input
            type="text"
            placeholder="Enter your post title..."
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg px-4 py-3 mb-6 text-gray-800 placeholder-gray-400 shadow-sm transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Quill Editor */}
          <div className="mb-8">
            <ReactQuill
              value={content}
              onChange={setContent}
              placeholder="Write your content here..."
              className="rounded-lg bg-white shadow-md border border-gray-200 min-h-[300px]"
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
            />
          </div>

          {/* Publish Button */}
          <div className="text-center">
            <button
              onClick={submitPost}
              disabled={loading}
              className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white transition-transform duration-300 ease-in-out bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-60"
            >
              {loading ? "Publishing..." : "🚀 Publish Post"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
