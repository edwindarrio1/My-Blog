"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Feather, Heart, Code2 } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-indigo-800 mb-6"
        >
          About This Blog
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-600 text-lg max-w-2xl mx-auto mb-12"
        >
          Welcome to our creative corner — where ideas, inspiration, and
          technology meet. This blog is built with ❤️ using Next.js, Firebase,
          and Framer Motion — designed to bring you beautiful, fast, and
          inspiring content.
        </motion.p>

        {/* Info Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Mission */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-indigo-100"
          >
            <Feather className="text-indigo-600 w-10 h-10 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-3 text-indigo-800">
              Our Mission
            </h3>
            <p className="text-gray-600 text-sm">
              To inspire creativity and share stories that connect people across
              the world — blending faith, technology, and personal growth into
              meaningful experiences.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-indigo-100"
          >
            <Heart className="text-pink-500 w-10 h-10 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-3 text-indigo-800">
              Our Vision
            </h3>
            <p className="text-gray-600 text-sm">
              To build a community of passionate readers and writers who use
              their voices to uplift, educate, and inspire others through
              authentic storytelling.
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-indigo-100"
          >
            <Code2 className="text-indigo-600 w-10 h-10 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-3 text-indigo-800">
              Built With
            </h3>
            <p className="text-gray-600 text-sm">
              This platform runs on Next.js + Firebase with a clean UI powered
              by Tailwind CSS and smooth Framer Motion animations. Secure admin
              controls allow post management and user authentication.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="my-16 h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent"
        />

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-indigo-800 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6">
            Have a question, suggestion, or just want to say hello?
          </p>

          <div className="flex justify-center">
            <Link
              href="mailto:peterjohn@example.com"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg transition"
            >
              <Mail size={20} />
              peterjohn@example.com
            </Link>
          </div>
        </motion.div>

        {/* Footer Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-gray-500 italic"
        >
          “Every word you write plants a seed of change in someone’s heart.”
        </motion.p>
      </div>
    </main>
  );
}
