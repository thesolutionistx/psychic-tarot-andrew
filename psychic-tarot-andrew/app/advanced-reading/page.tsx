"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdvancedReadingPage() {
  const [loading, setLoading] = useState(true);
  const [readingText, setReadingText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [tokensLeft, setTokensLeft] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const rid = searchParams.get("rid");

  useEffect(() => {
    if (rid) {
      getAdvancedReading(rid);
    }
  }, [rid]);

  async function getAdvancedReading(id: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/advanced-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ readingId: Number(id) })
      });
      const data = await res.json();
      if (data.success) {
        setReadingText(data.advancedReading);
        setTokensLeft(data.remainingTokens);
      } else {
        setErrorMsg(data.error || "Failed");
      }
    } catch (err) {
      setErrorMsg("Error retrieving advanced reading");
    }
    setLoading(false);
  }

  if (!rid) {
    return <div className="mt-10">No reading ID.</div>;
  }
  return (
    <div className="max-w-2xl w-full mt-10 flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Advanced Reading</h2>
      {loading && <div>Loading...</div>}
      {!loading && errorMsg && <div className="text-red-500">{errorMsg}</div>}
      {!loading && readingText && (
        <div className="whitespace-pre-wrap bg-white text-black p-4 rounded">
          {readingText}
        </div>
      )}
      {tokensLeft !== null && (
        <div>Your remaining tokens: {tokensLeft}</div>
      )}
    </div>
  );
}
