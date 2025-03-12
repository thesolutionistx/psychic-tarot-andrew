"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Reading = {
  id: number;
  spreadCards: string;
  advancedText: string | null;
  createdAt: string;
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [readings, setReadings] = useState<Reading[]>([]);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    fetchReadings();
    fetchTokens();
  }, []);

  async function fetchReadings() {
    const res = await fetch("/api/my-readings");
    if (res.ok) {
      const data = await res.json();
      setReadings(data);
    }
  }

  async function fetchTokens() {
    const res = await fetch("/api/my-tokens");
    if (res.ok) {
      const data = await res.json();
      setTokens(data.tokens);
    }
  }

  return (
    <div className="max-w-2xl w-full mt-10 flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      {!session && <div>Please log in.</div>}
      {session && (
        <>
          <p className="text-sm">Logged in as {session.user?.email}</p>
          <p>Tokens: {tokens}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 px-4 py-2 rounded text-black w-fit"
          >
            Sign Out
          </button>
          <a
            href="/buy-tokens"
            className="bg-yellow-400 px-4 py-2 rounded text-black w-fit"
          >
            Buy Tokens
          </a>
          <div className="mt-8">
            <h3 className="font-bold mb-3">My Past Readings</h3>
            <div className="flex flex-col gap-4">
              {readings.map(r => {
                const spread = JSON.parse(r.spreadCards);
                return (
                  <div key={r.id} className="bg-white text-black p-4 rounded">
                    <p className="font-semibold">Reading #{r.id}</p>
                    <p className="text-sm text-gray-700">
                      {new Date(r.createdAt).toLocaleString()}
                    </p>
                    <p className="my-2 text-sm">
                      Cards:{" "}
                      {spread.map((c: any) =>
                        `${c.name}${c.reversed ? " (Reversed)" : ""}`
                      ).join(", ")}
                    </p>
                    {r.advancedText && (
                      <div className="text-sm bg-gray-100 p-2 rounded">
                        {r.advancedText}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
