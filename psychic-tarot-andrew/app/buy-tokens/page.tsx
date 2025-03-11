# app/buy-tokens/page.tsx
"use client";

import { useState } from "react";

export default function BuyTokensPage() {
  const [statusMsg, setStatusMsg] = useState("");

  async function handlePurchase() {
    setStatusMsg("Processing...");
    const res = await fetch("/api/buy-tokens", { method: "POST" });
    const data = await res.json();
    if (data.success) {
      setStatusMsg(`Purchase complete. New token balance: ${data.tokens}`);
    } else {
      setStatusMsg("Purchase failed or not logged in.");
    }
  }

  return (
    <div className="max-w-md w-full mt-10">
      <h2 className="text-2xl font-bold mb-4">Buy Tokens</h2>
      <p className="mb-4">
        Click below to simulate purchase of 20 tokens for $5 (mock).
      </p>
      <button onClick={handlePurchase} className="bg-yellow-400 px-4 py-2 rounded text-black">
        Buy 20 Tokens
      </button>
      {statusMsg && <p className="mt-4">{statusMsg}</p>}
    </div>
  );
}
