"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import BlogSidebar from "@/app/components/BlogSidebar"; // ✅ Import your new sidebar

export default function CreatePost() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!user) {
    return (
      <p className="text-center mt-10 text-red-600">
        You must be logged in to create a post.
      </p>
    );
  }

  const submitPost = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Fill title and content!");
      return;
    }

    await addDoc(collection(db, "posts"), {
      title,
      content,
      author: user.email,
      authorId: user.uid,
      createdAt: serverTimestamp(),
    });

    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 relative">
      {/* ✅ Blog Sidebar */}
      <BlogSidebar />

      {/* ✅ Main content area */}
      <main className="flex-1 md:ml-64 p-8 transition-all duration-300">
        <div className="bg-white/80 backdrop-blur-lg border border-indigo-100 shadow-2xl rounded-2xl p-8 max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-6">
            ✍️ Create New Post
          </h2>

          <input
            type="text"
            placeholder="Post title"
            className="border border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 p-3 rounded-lg w-full mb-4 outline-none transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your content..."
            className="border border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 p-3 rounded-lg w-full min-h-[200px] mb-6 outline-none transition"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={submitPost}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:scale-105 hover:from-indigo-700 hover:to-purple-700 transition-transform"
          >
            Publish Post 🚀
          </button>
        </div>
      </main>
    </div>
  );
}
