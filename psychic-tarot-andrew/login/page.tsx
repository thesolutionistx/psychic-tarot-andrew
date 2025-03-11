# app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    setLoading(false);
    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="max-w-md w-full mt-10">
      <h2 className="text-xl font-bold mb-4">Login / Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="px-3 py-2 rounded text-black"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          aria-label="Email"
          required
        />
        <input
          className="px-3 py-2 rounded text-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          aria-label="Password"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          className={`bg-blue-600 px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
