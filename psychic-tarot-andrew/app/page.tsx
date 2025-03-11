import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-6 mt-10">
      <h1 className="text-3xl font-bold text-center">Psychic Tarot Andrew</h1>
      <p className="text-center">
        Draw a free spread or get an advanced AI-assisted reading.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <Link href="/login" className="px-4 py-2 bg-amber-500 rounded text-black text-center">
          Login / Register
        </Link>
        <Link href="/draw-cards" className="px-4 py-2 bg-green-500 rounded text-black text-center">
          Draw Cards
        </Link>
        <Link href="/dashboard" className="px-4 py-2 bg-indigo-500 rounded text-white text-center">
          My Dashboard
        </Link>
      </div>
    </div>
  );
}
