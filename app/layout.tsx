"use client";

import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import BlogSidebar from "@/app/components/BlogSidebar"; // ✅ Imported your BlogSidebar

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 text-gray-900 antialiased">
        <AuthProvider>
          <AppLayout>{children}</AppLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  const logoutUser = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  // 🧭 Hide sidebar on admin pages
  if (isAdminPage) {
    return (
      <main className="min-h-screen bg-white text-gray-900 p-8">
        {children}
      </main>
    );
  }

  // 🌈 Use BlogSidebar for all public pages
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* ✅ Sidebar */}
      <BlogSidebar />

      {/* ✅ Main Content */}
      <main className="flex-1 p-8 md:ml-64 transition-all duration-300">
        <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-md p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
