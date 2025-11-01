"use client";

import { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogHomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      const querySnap = await getDocs(collection(db, "posts"));
      const postData = querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postData);
    }
    loadPosts();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-center mb-12 text-gray-800"
      >
        ✨ My Blog
      </motion.h1>

      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const isExpanded = expandedPostId === post.id;
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition flex flex-col"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                {post.title}
              </h2>

              {/* Fluid post content */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={isExpanded ? "expanded" : "collapsed"}
                  initial={{ height: isExpanded ? 0 : "auto" }}
                  animate={{ height: isExpanded ? "auto" : 128 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden text-gray-600 mb-4"
                >
                  <div
                    className="prose prose-sm max-w-full"
                    dangerouslySetInnerHTML={{ __html: post.content || "" }}
                  />
                </motion.div>
              </AnimatePresence>

              <button
                onClick={() => toggleExpand(post.id)}
                className="text-indigo-600 font-medium hover:underline mt-auto self-start"
              >
                {isExpanded ? "Show Less" : "Read More →"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
