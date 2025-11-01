"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

export default function PostPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // ensure string
  const [post, setPost] = useState<DocumentData | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;

      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
      }
    }

    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-200">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <h1 className="text-4xl font-bold mb-6 text-white drop-shadow">
        {post.title}
      </h1>
      <p className="text-gray-300 mb-8">
        {post.createdAt
          ? new Date(post.createdAt.seconds * 1000).toLocaleDateString()
          : ""}
      </p>

      {/* Full Quill content */}
      <div
        className="prose prose-invert max-w-full text-gray-100"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />

      <Link
        href="/"
        className="mt-8 inline-block text-indigo-300 font-medium hover:underline"
      >
        ← Back to Blog
      </Link>
    </div>
  );
}
