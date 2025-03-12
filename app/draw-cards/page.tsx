"use client";

import React from 'react';
import { useState } from "react";
import Link from "next/link";

type TarotCard = {
  name: string;
  reversed: boolean;
};

const deck = [
  "The Fool","The Magician","The High Priestess","The Empress","The Emperor","The Hierophant",
  "The Lovers","The Chariot","Strength","The Hermit","Wheel of Fortune","Justice","The Hanged Man",
  "Death","Temperance","The Devil","The Tower","The Star","The Moon","The Sun","Judgement",
  "The World","Ace of Cups","Two of Cups","Three of Cups","Four of Cups","Five of Cups","Six of Cups",
  "Seven of Cups","Eight of Cups","Nine of Cups","Ten of Cups","Page of Cups","Knight of Cups","Queen of Cups",
  "King of Cups","Ace of Pentacles","Two of Pentacles","Three of Pentacles","Four of Pentacles","Five of Pentacles",
  "Six of Pentacles","Seven of Pentacles","Eight of Pentacles","Nine of Pentacles","Ten of Pentacles","Page of Pentacles",
  "Knight of Pentacles","Queen of Pentacles","King of Pentacles","Ace of Swords","Two of Swords","Three of Swords","Four of Swords",
  "Five of Swords","Six of Swords","Seven of Swords","Eight of Swords","Nine of Swords","Ten of Swords","Page of Swords","Knight of Swords",
  "Queen of Swords","King of Swords","Ace of Wands","Two of Wands","Three of Wands","Four of Wands","Five of Wands","Six of Wands",
  "Seven of Wands","Eight of Wands","Nine of Wands","Ten of Wands","Page of Wands","Knight of Wands","Queen of Wands","King of Wands"
];

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function DrawCardsPage() {
  const [spreadSize, setSpreadSize] = useState(3);
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [readingId, setReadingId] = useState<number | null>(null);

  async function drawCards() {
    const shuffled = shuffle(deck);
    const selected = shuffled.slice(0, spreadSize).map(name => ({
      name,
      reversed: Math.random() < 0.5
    }));
    setDrawnCards(selected);

    // Persist reading
    const res = await fetch("/api/draw-cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ drawnCards: selected })
    });
    const data = await res.json();
    if (data.success) setReadingId(data.readingId);
  }

  return (
    <div className="w-full max-w-xl flex flex-col gap-6 mt-10">
      <h2 className="text-2xl font-bold text-center">Draw Your Cards</h2>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <select
          value={spreadSize}
          onChange={e => setSpreadSize(Number(e.target.value))}
          className="px-3 py-2 text-black rounded"
        >
          <option value={1}>One Card</option>
          <option value={3}>Three Cards</option>
          <option value={5}>Five Cards</option>
          <option value={7}>Seven Cards</option>
          <option value={10}>Ten Cards</option>
        </select>
        <button
          onClick={drawCards}
          className="bg-green-500 px-4 py-2 rounded text-black"
        >
          Draw
        </button>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {drawnCards.map((card, idx) => (
          <div
            key={idx}
            className="w-28 h-40 bg-white text-black rounded shadow flex flex-col items-center justify-center"
          >
            <div className="font-bold text-center">{card.name}</div>
            {card.reversed && <div className="text-red-600">Reversed</div>}
          </div>
        ))}
      </div>
      {readingId && drawnCards.length > 0 && (
        <Link
          href={`/advanced-reading?rid=${readingId}`}
          className="bg-indigo-500 px-4 py-2 rounded text-center"
        >
          Get Advanced Reading
        </Link>
      )}
    </div>
  );
}
