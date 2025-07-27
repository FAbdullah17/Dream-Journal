"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const moods = [
  { label: "Calm 😌", value: "calm" },
  { label: "Happy 😊", value: "happy" },
  { label: "Anxious 😟", value: "anxious" },
  { label: "Stressed 😫", value: "stressed" },
  { label: "Excited 🤩", value: "excited" },
];

export default function JournalPage() {
  const [dream, setDream] = useState("");
  const [mood, setMood] = useState(moods[0].value);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [showDreamProfile, setShowDreamProfile] = useState(false);
  const [showLucidCoach, setShowLucidCoach] = useState(false);
  const [diary, setDiary] = useState<
    {
      date: string;
      dream: string;
      mood: string;
      interpretation: any;
      symbols: string[];
      dreamProfile: any;
      lucidCoach: string;
    }[]
  >([]);

  async function handleAnalyze() {
    setLoading(true);
    setResult(null);
    // Replace with your FastAPI endpoint
    const res = await fetch("http://127.0.0.1:8000/api/analyze", {
      method: "POST",
      body: JSON.stringify({ dream, mood }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  function handleDelete(idx: number) {
    setDiary(diary.filter((_, i) => i !== idx));
  }

  function handleSave() {
    setDiary([
      ...diary,
      {
        date: new Date().toLocaleDateString(),
        dream,
        mood,
        interpretation: result.interpretation,
        symbols: result.symbols,
        dreamProfile: result.dream_profile,
        lucidCoach: result.lucid_coach,
      },
    ]);
    setDream("");
    setResult(null);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center font-nunito px-4 py-8">
      {/* Dream Entry Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 max-w-3xl w-full mb-10 relative"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
          Write Your Dream <span className="text-2xl">💭</span>
        </h2>
        <textarea
          className="w-full h-32 p-4 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 mb-4 resize-none bg-purple-50 text-blue-900 font-[cursive]"
          placeholder="Describe your dream in detail..."
          value={dream}
          onChange={(e) => setDream(e.target.value)}
        />
        <div className="flex items-center gap-4 mb-4">
          <label className="text-purple-700 font-semibold">Mood:</label>
          <select
            className="rounded-full px-4 py-2 bg-purple-100 text-blue-900 font-semibold"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            {moods.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-purple-400 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all text-lg flex items-center gap-2"
          onClick={handleAnalyze}
          disabled={loading || !dream}
        >
          {loading ? (
            <span className="animate-spin mr-2">✨</span>
          ) : (
            <>
              Analyze My Dream <span className="text-xl">✨</span>
            </>
          )}
        </button>
        {/* Result Display */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 shadow-inner relative space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-2 right-4 text-2xl"
              >
                🔮
              </motion.div>
              <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
                Dream Analysis <span className="text-xl">🔮</span>
              </h3>

              {/* Symbols */}
              {result.symbols && result.symbols.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-semibold text-purple-700 mb-1">
                    Symbols Found:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.symbols.map((symbol: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-sm"
                      >
                        {symbol}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Interpretations */}
              <div className="space-y-3">
                {result.interpretation?.emotional && (
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-1 flex items-center gap-1">
                      💙 Emotional Interpretation
                    </h4>
                    <p className="text-blue-900 text-sm">
                      {result.interpretation.emotional}
                    </p>
                  </div>
                )}

                {result.interpretation?.psychological && (
                  <div>
                    <h4 className="font-semibold text-green-700 mb-1 flex items-center gap-1">
                      🧠 Psychological Interpretation
                    </h4>
                    <p className="text-green-900 text-sm">
                      {result.interpretation.psychological}
                    </p>
                  </div>
                )}

                {result.interpretation?.cultural && (
                  <div>
                    <h4 className="font-semibold text-indigo-700 mb-1 flex items-center gap-1">
                      🌍 Cultural Interpretation
                    </h4>
                    <p className="text-indigo-900 text-sm">
                      {result.interpretation.cultural}
                    </p>
                  </div>
                )}
              </div>

              {/* Dream Profile */}
              {result.dream_profile && (
                <div className="bg-pink-50 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setShowDreamProfile(!showDreamProfile)}
                    className="w-full flex items-center justify-between p-3 hover:bg-pink-100 transition-colors"
                  >
                    <h4 className="font-semibold text-pink-700 flex items-center gap-2">
                      🌸 Dream Profile
                    </h4>
                    <span className={`text-pink-700 transform transition-transform ${showDreamProfile ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  <AnimatePresence>
                    {showDreamProfile && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-3 pb-3"
                      >
                        <div className="text-sm space-y-1">
                          <p>
                            <span className="font-medium">Overall Mood:</span>{" "}
                            {result.dream_profile.overall_mood}
                          </p>
                          <p>
                            <span className="font-medium">Mental State:</span>{" "}
                            {result.dream_profile.mental_state}
                          </p>
                          <p>
                            <span className="font-medium">Confidence:</span>{" "}
                            {Math.round(result.dream_profile.confidence_score * 100)}%
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Lucid Coach */}
              {result.lucid_coach && (
                <div className="bg-yellow-50 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setShowLucidCoach(!showLucidCoach)}
                    className="w-full flex items-center justify-between p-3 hover:bg-yellow-100 transition-colors"
                  >
                    <h4 className="font-semibold text-yellow-700 flex items-center gap-2">
                      🌙 Lucid Dreaming Coach
                    </h4>
                    <span className={`text-yellow-700 transform transition-transform ${showLucidCoach ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  <AnimatePresence>
                    {showLucidCoach && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-3 pb-3"
                      >
                        <div className="text-sm text-yellow-900 whitespace-pre-line">
                          {result.lucid_coach}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <button
                className="mt-4 bg-blue-300 hover:bg-blue-400 text-white font-semibold py-2 px-6 rounded-full shadow transition-all"
                onClick={handleSave}
              >
                Save to Diary <span className="text-xl">📔</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {/* Dream Diary */}
      <div className="w-full max-w-2xl">
        <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          Your Dream Diary <span className="text-xl">📔</span>
        </h2>
        <div className="space-y-6">
          {diary.length === 0 && (
            <p className="text-purple-700 text-center opacity-70">
              No dreams saved yet. Start journaling!
            </p>
          )}
          <AnimatePresence>
            {diary.map((entry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: 30, rotate: 2 }}
                transition={{ duration: 0.7 }}
                className="relative bg-white bg-opacity-90 rounded-2xl shadow-lg p-6"
              >
                {/* Delete Button moved to bottom right */}
                <button
                  onClick={() => handleDelete(idx)}
                  className="absolute bottom-2 right-2 text-red-500 hover:text-red-700 text-lg px-2 py-1 rounded transition"
                  title="Delete this dream"
                >
                  🗑️
                </button>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-blue-700 font-semibold">
                    {entry.date}
                  </span>
                  <span className="text-xl">
                    {moods.find((m) => m.value === entry.mood)?.label}
                  </span>
                </div>
                <div className="font-[cursive] text-lg text-blue-900 mb-4">
                  {entry.dream}
                </div>

                {/* Symbols */}
                {entry.symbols && entry.symbols.length > 0 && (
                  <div className="mb-3">
                    <span className="text-purple-700 font-semibold text-sm">
                      Symbols:{" "}
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {entry.symbols.map(
                        (symbol: string, symbolIdx: number) => (
                          <span
                            key={symbolIdx}
                            className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs"
                          >
                            {symbol}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Interpretations */}
                <div className="space-y-2 mb-4">
                  {entry.interpretation?.emotional && (
                    <div>
                      <span className="font-semibold text-blue-700 text-sm">
                        💙 Emotional:
                      </span>
                      <p className="text-blue-900 text-sm mt-1">
                        {entry.interpretation.emotional.substring(0, 150)}...
                      </p>
                    </div>
                  )}

                  {entry.interpretation?.psychological && (
                    <div>
                      <span className="font-semibold text-green-700 text-sm">
                        🧠 Psychological:
                      </span>
                      <p className="text-green-900 text-sm mt-1">
                        {entry.interpretation.psychological.substring(0, 150)}
                        ...
                      </p>
                    </div>
                  )}

                  {entry.interpretation?.cultural && (
                    <div>
                      <span className="font-semibold text-indigo-700 text-sm">
                        🌍 Cultural:
                      </span>
                      <p className="text-indigo-900 text-sm mt-1">
                        {entry.interpretation.cultural.substring(0, 150)}...
                      </p>
                    </div>
                  )}
                </div>

                {/* Dream Profile */}
                {entry.dreamProfile && (
                  <div className="bg-pink-50 p-2 rounded-lg mb-3">
                    <span className="font-semibold text-pink-700 text-sm">
                      🌸 Profile:{" "}
                    </span>
                    <span className="text-pink-900 text-sm">
                      {entry.dreamProfile.overall_mood}
                    </span>
                    {entry.dreamProfile.confidence_score && (
                      <span className="text-pink-700 text-xs ml-2">
                        ({Math.round(entry.dreamProfile.confidence_score * 100)}
                        % confidence)
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
