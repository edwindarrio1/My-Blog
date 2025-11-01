"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { signup, googleLogin } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignup = async (e: any) => {
    e.preventDefault();
    await signup(email, password);
    router.push("/");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>

      <form onSubmit={onSignup} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-indigo-600 text-white py-2 rounded">
          Sign Up
        </button>
      </form>

      <button
        onClick={googleLogin}
        className="bg-red-600 text-white mt-4 w-full py-2 rounded"
      >
        Sign Up with Google
      </button>
    </div>
  );
}
