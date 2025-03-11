"use client";

import { useState } from "react";
import Link from "next/link";

type TarotCard = {
  name: string;
  reversed: boolean;
};

const deck = [
    "The Fool": {
        uprightMeaning: "Fresh starts, new adventures, and a leap of faith. Trust the Universe and take that risk—your spirit guides have your back!",
        uprightAffirmation: "I embrace new beginnings with confidence and joy.",
        reversedMeaning: "Hesitation, fear of the unknown, reckless choices.",
        reversedAffirmation: "I trust myself to take wise and courageous steps."
    },
    "The Magician": {
        uprightMeaning: "Manifestation mode: ON. You have all the tools to create the life you desire. Align thoughts with actions and make magic happen.",
        uprightAffirmation: "I am the creator of my reality.",
        reversedMeaning: "Blocked manifestation, deception, lack of action.",
        reversedAffirmation: "I align my thoughts and actions with my highest potential."
    },
    "The High Priestess": {
        uprightMeaning: "Your intuition is screaming—listen! Secrets, dreams, and inner wisdom are guiding you. Trust your gut.",
        uprightAffirmation: "I am deeply connected to my inner knowing.",
        reversedMeaning: "Disconnected from intuition, hidden truths, secrets.",
        reversedAffirmation: "I trust my inner wisdom and release self-doubt."
    },
    "The Empress": {
        uprightMeaning: "Abundance, creativity, and divine feminine energy. Nurture yourself and your dreams, and watch them flourish.",
        uprightAffirmation: "I attract love, beauty, and abundance effortlessly.",
        reversedMeaning: "Blocked creativity, insecurity, neglecting self-care.",
        reversedAffirmation: "I nurture myself and allow abundance to flow."
    },
    "The Emperor": {
        uprightMeaning: "Structure, leadership, and divine masculine power. Step up and take control—you’re the CEO of your life.",
        uprightAffirmation: "I build my future with confidence and discipline.",
        reversedMeaning: "Control issues, rigidity, feeling powerless.",
        reversedAffirmation: "I embrace balanced leadership with confidence."
    },
    "The Hierophant": {
        uprightMeaning: "Tradition, spiritual guidance, and wisdom. Lean into mentors, rituals, or teachings that support your path.",
        uprightAffirmation: "I am open to divine wisdom and higher learning.",
        reversedMeaning: "Breaking traditions, questioning beliefs, rebellion.",
        reversedAffirmation: "I follow my unique spiritual path with trust."
    },
    "The Lovers": {
        uprightMeaning: "Soul-aligned choices and deep connections. Whether love or life, choose what resonates with your heart.",
        uprightAffirmation: "I align with love, harmony, and my highest good.",
        reversedMeaning: "Misalignment, disharmony, difficult choices.",
        reversedAffirmation: "I align with love and make choices from the heart."
    },
    "The Chariot": {
        uprightMeaning: "Victory through willpower. Time to take the reins and move forward with confidence. Keep your focus sharp.",
        uprightAffirmation: "I am determined, powerful, and unstoppable.",
        reversedMeaning: "Loss of direction, lack of control, delays.",
        reversedAffirmation: "I take charge of my life with determination."
    },
    "Strength": {
        uprightMeaning: "Inner resilience, courage, and grace. You don’t need to force things—your quiet power speaks volumes.",
        uprightAffirmation: "I face challenges with courage and compassion.",
        reversedMeaning: "Self-doubt, fear, inner weakness.",
        reversedAffirmation: "I trust in my resilience and inner power."
    },
    "The Hermit": {
        uprightMeaning: "Spiritual growth, introspection, and solitude. Pause, reflect, and find your truth within.",
        uprightAffirmation: "I honor my journey and trust my inner wisdom.",
        reversedMeaning: "Isolation, loneliness, ignoring inner guidance.",
        reversedAffirmation: "I seek wisdom within while staying connected to others."
    },
    "Wheel of Fortune": {
        uprightMeaning: "Destiny is shifting! Expect major changes—good luck, karma, and divine timing are at play.",
        uprightAffirmation: "I trust the Universe’s perfect timing.",
        reversedMeaning: "Resistance to change, bad luck, setbacks.",
        reversedAffirmation: "I embrace life’s cycles and trust the timing of the Universe."
    },
    "Justice": {
        uprightMeaning: "Truth, balance, and karma. What’s meant for you will not miss you. Stay honest and aligned.",
        uprightAffirmation: "I am in alignment with truth and fairness.",
        reversedMeaning: "Injustice, dishonesty, lack of accountability.",
        reversedAffirmation: "I align with truth and fairness in all situations."
    },
    "The Hanged Man": {
        uprightMeaning: "Surrender and see things differently. Pause, reflect, and trust that stillness leads to clarity.",
        uprightAffirmation: "I release control and trust the process.",
        reversedMeaning: "Stagnation, indecision, unwillingness to change.",
        reversedAffirmation: "I surrender to new perspectives and trust the process."
    },
    "Death": {
        uprightMeaning: "Endings bring transformation. Let go, level up, and embrace your rebirth.",
        uprightAffirmation: "I release the old to welcome the new.",
        reversedMeaning: "Resisting transformation, fear of change, stagnation.",
        reversedAffirmation: "I release the old and welcome transformation."
    },
    "Temperance": {
        uprightMeaning: "Balance, patience, and divine flow. Everything is coming together perfectly—just stay aligned.",
        uprightAffirmation: "I trust in the harmony of the Universe.",
        reversedMeaning: "Imbalance, excess, lack of harmony.",
        reversedAffirmation: "I restore balance and trust in divine flow."
    },
    "The Devil": {
        uprightMeaning: "Shadow work, temptation, and breaking free. What’s holding you back? Cut the cords and reclaim your power.",
        uprightAffirmation: "I release what no longer serves me.",
        reversedMeaning: "Breaking free, overcoming addiction, reclaiming power.",
        reversedAffirmation: "I release toxic patterns and reclaim my strength."
    },
    "The Tower": {
        uprightMeaning: "Sudden shifts, breakthroughs, and awakenings. Trust that destruction clears the way for something better.",
        uprightAffirmation: "I embrace change as a path to growth.",
        reversedMeaning: "Avoiding disaster, fear of change, delaying the inevitable.",
        reversedAffirmation: "I embrace necessary change for my highest good."
    },
    "The Star": {
        uprightMeaning: "Hope, healing, and divine alignment. Your manifestations are coming—keep the faith.",
        uprightAffirmation: "I am guided, blessed, and inspired.",
        reversedMeaning: "Loss of hope, self-doubt, lack of inspiration.",
        reversedAffirmation: "I trust in my path and remain open to guidance."
    },
    "The Moon": {
        uprightMeaning: "Intuition, illusions, and subconscious work. Something isn’t as it seems—trust your instincts.",
        uprightAffirmation: "I see beyond illusions and trust my inner light.",
        reversedMeaning: "Confusion, deception, repressed emotions.",
        reversedAffirmation: "I seek clarity and trust my intuition."
    },
    "The Sun": {
        uprightMeaning: "Joy, success, and clarity! This is your moment to shine—everything is working in your favor.",
        uprightAffirmation: "I radiate positivity, love, and light.",
        reversedMeaning: "Temporary sadness, ego, lack of clarity.",
        reversedAffirmation: "I choose joy and trust in my inner light."
    },
    "Judgement": {
        uprightMeaning: "Awakening, purpose, and second chances. Rise into your higher self and answer your calling.",
        uprightAffirmation: "I embrace my divine purpose with confidence.",
        reversedMeaning: "Self-doubt, ignoring a calling, fear of change.",
        reversedAffirmation: "I listen to my higher calling and embrace my purpose."
    },
    "The World": {
        uprightMeaning: "Completion, success, and new cycles. You’ve made it! Celebrate and get ready for the next adventure.",
        uprightAffirmation: "I embrace my journey with gratitude and excitement.",
        reversedMeaning: "Incompletion, delays, unfinished lessons.",
        reversedAffirmation: "I trust that everything unfolds in divine timing."
    },
    "Ace of Cups": {
        uprightMeaning: "Overflowing love, new emotional beginnings. Open your heart!",
        uprightAffirmation: "I welcome love and emotional abundance.",
        reversedMeaning: "Blocked emotions, lack of self-love, sadness.",
        reversedAffirmation: "I open my heart to healing and self-love."
    },
    "Two of Cups": {
        uprightMeaning: "Soulmate energy, partnerships, mutual love. Divine connection!",
        uprightAffirmation: "I am open to deep and meaningful relationships.",
        reversedMeaning: "Disconnection, imbalance in relationships, miscommunication.",
        reversedAffirmation: "I nurture balanced and loving connections."
    },
    "Three of Cups": {
        uprightMeaning: "Friendship, celebration, joy. Good vibes all around!",
        uprightAffirmation: "I am surrounded by love and joyful connections.",
        reversedMeaning: "Overindulgence, gossip, superficial friendships.",
        reversedAffirmation: "I attract genuine connections filled with joy."
    },
    "Four of Cups": {
        uprightMeaning: "Discontent, missed opportunities. Shift your perspective!",
        uprightAffirmation: "I appreciate the blessings in front of me.",
        reversedMeaning: "New opportunities, letting go of apathy, awareness.",
        reversedAffirmation: "I open myself to new possibilities."
    },
    "Five of Cups": {
        uprightMeaning: "Grief, loss, disappointment. Look for the silver lining.",
        uprightAffirmation: "I find healing and gratitude in all experiences.",
        reversedMeaning: "Healing, acceptance, moving forward.",
        reversedAffirmation: "I find peace and gratitude in my experiences."
    },
    "Six of Cups": {
        uprightMeaning: "Nostalgia, soul ties, sweet memories. A past connection resurfaces!",
        uprightAffirmation: "I cherish memories while embracing the present.",
        reversedMeaning: "Living in the past, nostalgia, stuck energy.",
        reversedAffirmation: "I embrace the present while honoring my past."
    },
    "Seven of Cups": {
        uprightMeaning: "Choices, illusions, fantasy vs. reality. What’s truly meant for you?",
        uprightAffirmation: "I choose what aligns with my highest good.",
        reversedMeaning: "Illusions shattered, poor choices, clarity.",
        reversedAffirmation: "I see things clearly and make empowered choices."
    },
    "Eight of Cups": {
        uprightMeaning: "Walking away, seeking more. Follow your heart’s calling!",
        uprightAffirmation: "I trust my intuition to guide my next steps.",
        reversedMeaning: "Fear of moving on, stagnation, unresolved emotions.",
        reversedAffirmation: "I trust that walking away leads to growth."
    },
    "Nine of Cups": {
        uprightMeaning: "Wish fulfillment, happiness, abundance. Your dreams are manifesting!",
        uprightAffirmation: "I am worthy of joy and abundance.",
        reversedMeaning: "Unfulfilled wishes, dissatisfaction, overindulgence.",
        reversedAffirmation: "I create true fulfillment within myself."
    },
    "Ten of Cups": {
        uprightMeaning: "Ultimate emotional fulfillment. Happily ever after vibes!",
        uprightAffirmation: "I am grateful for love and harmony in my life.",
        reversedMeaning: "Family disharmony, unrealistic expectations, emotional loss.",
        reversedAffirmation: "I nurture loving relationships and emotional stability."
    },
    "Page of Cups": {
        uprightMeaning: "Innocence, emotional messages, intuition.",
        uprightAffirmation: "I follow my heart with an open mind.",
        reversedMeaning: "Emotional immaturity, creative blocks, naivety.",
        reversedAffirmation: "I embrace emotional growth and creativity."
    },
    "Knight of Cups": {
        uprightMeaning: "Romantic offers, emotional pursuit, charm.",
        uprightAffirmation: "I move forward with love and authenticity.",
        reversedMeaning: "Overly romanticized, mood swings, unrealistic ideals.",
        reversedAffirmation: "I honor my emotions while staying grounded."
    },
    "Queen of Cups": {
        uprightMeaning: "Intuition, deep feelings, compassion.",
        uprightAffirmation: "I honor my emotions and inner wisdom.",
        reversedMeaning: "Emotional overwhelm, codependency, manipulation.",
        reversedAffirmation: "I create healthy emotional boundaries."
    },
    "King of Cups": {
        uprightMeaning: "Emotional balance, wisdom, maturity.",
        uprightAffirmation: "I lead with love and emotional strength.",
        reversedMeaning: "Emotional repression, manipulation, moodiness.",
        reversedAffirmation: "I balance my emotions with wisdom and care."
    },
    "Ace of Pentacles": {
        uprightMeaning: "New opportunities, financial blessings. Seeds of abundance are being planted!",
        uprightAffirmation: "I welcome prosperity and growth.",
        reversedMeaning: "Missed opportunities, financial instability, lack of planning.",
        reversedAffirmation: "I trust that abundance flows to me in divine timing."
    },
    "Two of Pentacles": {
        uprightMeaning: "Balance, multitasking, priorities. Find your flow!",
        uprightAffirmation: "I create harmony in all aspects of my life.",
        reversedMeaning: "Overwhelm, poor time management, imbalance.",
        reversedAffirmation: "I create harmony in all aspects of my life."
    },
    "Three of Pentacles": {
        uprightMeaning: "Teamwork, collaboration, skill-building. You don’t have to do it alone!",
        uprightAffirmation: "I thrive in supportive partnerships.",
        reversedMeaning: "Lack of teamwork, misalignment, poor work ethic.",
        reversedAffirmation: "I collaborate with others to achieve success."
    },
    "Four of Pentacles": {
        uprightMeaning: "Security, control, saving money. Let go of fear around abundance.",
        uprightAffirmation: "I trust in the flow of prosperity.",
        reversedMeaning: "Financial insecurity, fear of loss, greed.",
        reversedAffirmation: "I release scarcity mindset and trust in abundance."
    },
    "Five of Pentacles": {
        uprightMeaning: "Financial hardship, feeling left out. Help is available—reach out!",
        uprightAffirmation: "I am resilient, and abundance is on its way.",
        reversedMeaning: "Recovery from financial struggles, finding support.",
        reversedAffirmation: "I welcome new opportunities and trust in better days."
    },
    "Six of Pentacles": {
        uprightMeaning: "Giving and receiving, balance in finances. Share your blessings!",
        uprightAffirmation: "I welcome the balance of giving and receiving.",
        reversedMeaning: "Power imbalances, selfishness, one-sided giving.",
        reversedAffirmation: "I give and receive in balanced, healthy ways."
    },
    "Seven of Pentacles": {
        uprightMeaning: "Long-term investment, patience. Your efforts will pay off!",
        uprightAffirmation: "I trust in divine timing.",
        reversedMeaning: "Impatience, lack of growth, poor investment.",
        reversedAffirmation: "I trust the process and nurture long-term success."
    },
    "Eight of Pentacles": {
        uprightMeaning: "Hard work, mastery, dedication. Keep going—your skills are leveling up!",
        uprightAffirmation: "I am committed to my personal growth.",
        reversedMeaning: "Lack of focus, cutting corners, burnout.",
        reversedAffirmation: "I commit to mastering my craft with dedication."
    },
    "Nine of Pentacles": {
        uprightMeaning: "Independence, luxury, self-sufficiency. You are thriving!",
        uprightAffirmation: "I enjoy the success I have created.",
        reversedMeaning: "Overworking, financial dependence, lack of self-worth.",
        reversedAffirmation: "I recognize my value and celebrate my success."
    },
    "Ten of Pentacles": {
        uprightMeaning: "Legacy, family, financial security. Generational wealth vibes!",
        uprightAffirmation: "I build a future of abundance and stability.",
        reversedMeaning: "Financial loss, family conflict, instability.",
        reversedAffirmation: "I build lasting security and generational wealth."
    },
    "Page of Pentacles": {
        uprightMeaning: "New financial or educational opportunities.",
        uprightAffirmation: "I build my future with dedication.",
        reversedMeaning: "Lack of focus, missed opportunities, procrastination.",
        reversedAffirmation: "I commit to growth and new opportunities."
    },
    "Knight of Pentacles": {
        uprightMeaning: "Hard work, steady progress, reliability.",
        uprightAffirmation: "I create lasting success through persistence.",
        reversedMeaning: "Laziness, stagnation, lack of ambition.",
        reversedAffirmation: "I stay consistent and committed to my goals."
    },
    "Queen of Pentacles": {
        uprightMeaning: "Nurturing, abundance, practicality.",
        uprightAffirmation: "I cultivate wealth and stability.",
        reversedMeaning: "Insecurity, work-life imbalance, materialism.",
        reversedAffirmation: "I create stability and nurture abundance."
    },
    "King of Pentacles": {
        uprightMeaning: "Success, leadership, financial security.",
        uprightAffirmation: "I am confident in my ability to build abundance.",
        reversedMeaning: "Greed, financial instability, overcontrolling.",
        reversedAffirmation: "I use my success to create lasting security."
    },
    "Ace of Swords": {
        uprightMeaning: "Mental clarity, breakthroughs, truth revealed. AHA moment!",
        uprightAffirmation: "I embrace clarity and wisdom.",
        reversedMeaning: "Confusion, lack of clarity, dishonesty.",
        reversedAffirmation: "I seek truth and wisdom with an open mind."
    },
    "Two of Swords": {
        uprightMeaning: "Indecision, crossroads. Trust your intuition!",
        uprightAffirmation: "I trust myself to make the right choice.",
        reversedMeaning: "Indecision, avoidance, mental confusion.",
        reversedAffirmation: "I trust myself to make clear and confident decisions."
    },
    "Three of Swords": {
        uprightMeaning: "Heartbreak, loss, lessons. Healing is on its way.",
        uprightAffirmation: "I allow myself to heal and grow from pain.",
        reversedMeaning: "Healing heartbreak, overcoming sadness, forgiveness.",
        reversedAffirmation: "I release past pain and embrace healing."
    },
    "Four of Swords": {
        uprightMeaning: "Rest, reflection, recharge. Self-care is a must!",
        uprightAffirmation: "I honor my need for rest and renewal.",
        reversedMeaning: "Restlessness, burnout, ignoring self-care.",
        reversedAffirmation: "I allow myself to rest and recharge."
    },
    "Five of Swords": {
        uprightMeaning: "Conflict, tension, lessons. Pick your battles.",
        uprightAffirmation: "I choose peace and wisdom in all conflicts.",
        reversedMeaning: "Resolution, letting go of conflict, past regrets.",
        reversedAffirmation: "I release resentment and choose peace."
    },
    "Six of Swords": {
        uprightMeaning: "Moving on, finding peace. Better days ahead!",
        uprightAffirmation: "I release the past and move forward with ease.",
        reversedMeaning: "Resisting change, emotional baggage, stuck energy.",
        reversedAffirmation: "I move forward with clarity and ease."
    },
    "Seven of Swords": {
        uprightMeaning: "Deception, strategy, hidden truths. Stay sharp!",
        uprightAffirmation: "I trust my intuition to reveal the truth.",
        reversedMeaning: "Truth revealed, deception exposed, self-deception.",
        reversedAffirmation: "I honor truth and act with integrity."
    },
    "Eight of Swords": {
        uprightMeaning: "Mental traps, fear-based thinking. You hold the key to freedom!",
        uprightAffirmation: "I free myself from limiting beliefs.",
        reversedMeaning: "Freedom, releasing fear, finding solutions.",
        reversedAffirmation: "I break free from limitations and embrace empowerment."
    },
    "Nine of Swords": {
        uprightMeaning: "Anxiety, worry, overthinking. You’re stronger than your fears!",
        uprightAffirmation: "I release fear and embrace inner peace.",
        reversedMeaning: "Overcoming anxiety, healing, relief.",
        reversedAffirmation: "I release fear and embrace inner peace."
    },
    "Ten of Swords": {
        uprightMeaning: "Endings, release, rock-bottom moments. New dawn rising!",
        uprightAffirmation: "I trust that every ending leads to a new beginning.",
        reversedMeaning: "Recovery, survival, learning from pain.",
        reversedAffirmation: "I rise stronger from every challenge."
    },
    "Page of Swords": {
        uprightMeaning: "Curiosity, learning, new ideas.",
        uprightAffirmation: "I seek knowledge with an open mind.",
        reversedMeaning: "Gossip, lack of direction, miscommunication.",
        reversedAffirmation: "I speak and seek truth with clarity."
    },
    "Knight of Swords": {
        uprightMeaning: "Ambition, quick decisions, determination.",
        uprightAffirmation: "I take bold and decisive action.",
        reversedMeaning: "Impatience, rash decisions, aggression.",
        reversedAffirmation: "I act with clarity, not impulsiveness."
    },
    "Queen of Swords": {
        uprightMeaning: "Intellect, honesty, clear communication.",
        uprightAffirmation: "I speak my truth with wisdom.",
        reversedMeaning: "Cold, distant, overly critical.",
        reversedAffirmation: "I balance logic with compassion."
    },
    "King of Swords": {
        uprightMeaning: "Logic, authority, sharp thinking.",
        uprightAffirmation: "I lead with clarity and integrity.",
        reversedMeaning: "Tyranny, manipulation, misuse of power.",
        reversedAffirmation: "I lead with integrity and clear vision."
    },
    "Ace of Wands": {
        uprightMeaning: "New inspiration, creative spark, fresh energy. Go for it!",
        uprightAffirmation: "I welcome new creative opportunities.",
        reversedMeaning: "Lack of inspiration, missed opportunities, delays.",
        reversedAffirmation: "I allow creativity and passion to flow freely."
    },
    "Two of Wands": {
        uprightMeaning: "Planning, choices, stepping into your power. The world is yours!",
        uprightAffirmation: "I boldly move toward my dreams.",
        reversedMeaning: "Fear of change, lack of planning, playing it safe.",
        reversedAffirmation: "I step out of my comfort zone with confidence."
    },
    "Three of Wands": {
        uprightMeaning: "Growth, expansion, and big moves. Your ships are coming in!",
        uprightAffirmation: "I am ready to embrace new opportunities.",
        reversedMeaning: "Delays, lack of progress, frustration.",
        reversedAffirmation: "I trust my journey even when things take time."
    },
    "Four of Wands": {
        uprightMeaning: "Celebration, success, and soul connections. Enjoy the moment!",
        uprightAffirmation: "I celebrate my progress and achievements.",
        reversedMeaning: "Conflict at home, canceled celebrations, instability.",
        reversedAffirmation: "I create harmony and celebrate my progress."
    },
    "Five of Wands": {
        uprightMeaning: "Competition, challenges, and inner fire. Stay focused.",
        uprightAffirmation: "I embrace challenges as opportunities to grow.",
        reversedMeaning: "Avoiding conflict, inner struggles, tension.",
        reversedAffirmation: "I resolve conflicts with wisdom and understanding."
    },
    "Six of Wands": {
        uprightMeaning: "Victory, recognition, and confidence. You’re winning!",
        uprightAffirmation: "I am successful and worthy of recognition.",
        reversedMeaning: "Lack of recognition, self-doubt, setbacks.",
        reversedAffirmation: "I celebrate my victories, even the small ones."
    },
    "Seven of Wands": {
        uprightMeaning: "Standing your ground, protecting your energy. Hold firm!",
        uprightAffirmation: "I confidently defend what matters to me.",
        reversedMeaning: "Defensiveness, feeling overwhelmed, burnout.",
        reversedAffirmation: "I protect my energy while staying open to growth."
    },
    "Eight of Wands": {
        uprightMeaning: "Fast movement, travel, rapid changes. Go with the flow!",
        uprightAffirmation: "I welcome exciting opportunities and progress.",
        reversedMeaning: "Delays, miscommunication, frustration.",
        reversedAffirmation: "I trust in divine timing and remain patient."
    },
    "Nine of Wands": {
        uprightMeaning: "Resilience, persistence, warrior spirit. Keep going!",
        uprightAffirmation: "I am strong and determined.",
        reversedMeaning: "Exhaustion, giving up, lack of resilience.",
        reversedAffirmation: "I push forward with strength and determination."
    },
    "Ten of Wands": {
        uprightMeaning: "Overwhelm, heavy burdens. Time to delegate!",
        uprightAffirmation: "I release what no longer serves me.",
        reversedMeaning: "Releasing burdens, feeling overwhelmed, burnout.",
        reversedAffirmation: "I release what no longer serves me."
    },
    "Page of Wands": {
        uprightMeaning: "Excitement, new discoveries, curiosity.",
        uprightAffirmation: "I embrace new adventures with enthusiasm.",
        reversedMeaning: "Lack of direction, creative block, immaturity.",
        reversedAffirmation: "I embrace my potential and take inspired action."
    },
    "Knight of Wands": {
        uprightMeaning: "Passion, bold action, chasing dreams.",
        uprightAffirmation: "I take fearless action toward my desires.",
        reversedMeaning: "Impulsiveness, recklessness, lack of focus.",
        reversedAffirmation: "I channel my energy wisely and with purpose."
    },
    "Queen of Wands": {
        uprightMeaning: "Confidence, charisma, magnetic energy.",
        uprightAffirmation: "I shine brightly and inspire others.",
        reversedMeaning: "Insecurity, jealousy, lack of self-confidence.",
        reversedAffirmation: "I step into my power with courage and grace."
    },
    "King of Wands": {
        uprightMeaning: "Leadership, vision, taking control.",
        uprightAffirmation: "I step into my power with confidence.",
        reversedMeaning: "Ego-driven, controlling, unrealistic expectations.",
        reversedAffirmation: "I lead with wisdom and integrity."
    }
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
