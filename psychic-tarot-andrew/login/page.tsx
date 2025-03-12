"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
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
        />
        <input
          className="px-3 py-2 rounded text-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}
