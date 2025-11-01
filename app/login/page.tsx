"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, googleLogin } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Google login failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={onLogin} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          required
          placeholder="Email"
          className="border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          value={password}
          required
          placeholder="Password"
          className="border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        className="bg-red-600 text-white mt-4 w-full py-2 rounded hover:bg-red-700"
      >
        Continue with Google
      </button>
    </div>
  );
}
