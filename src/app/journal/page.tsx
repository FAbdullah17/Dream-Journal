// "use client";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const moods = [
//   { label: "Calm 😌", value: "calm" },
//   { label: "Happy 😊", value: "happy" },
//   { label: "Anxious 😟", value: "anxious" },
//   { label: "Stressed 😫", value: "stressed" },
//   { label: "Excited 🤩", value: "excited" },
// ];

// export default function JournalPage() {
//   const [dream, setDream] = useState("");
//   const [mood, setMood] = useState(moods[0].value);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState("");
//   const [diary, setDiary] = useState<
//     { date: string; dream: string; mood: string; meaning: string }[]
//   >([]);

//   async function handleAnalyze() {
//     setLoading(true);
//     setResult("");
//     // Replace with your FastAPI endpoint
//     const res = await fetch("http://127.0.0.1:8000/api/analyze", {
//       method: "POST",
//       body: JSON.stringify({ dream, mood }),
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await res.json();
//     setResult(data.interpretation);
//     setLoading(false);
//   }

//   function handleDelete(idx: number) {
//     setDiary(diary.filter((_, i) => i !== idx));
//   }

//   function handleSave() {
//     setDiary([
//       ...diary,
//       {
//         date: new Date().toLocaleDateString(),
//         dream,
//         mood,
//         meaning: result,
//       },
//     ]);
//     setDream("");
//     setResult("");
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center font-nunito px-4 py-8">
//       {/* Dream Entry Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 max-w-xl w-full mb-10 relative"
//       >
//         <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
//           Write Your Dream <span className="text-2xl">💭</span>
//         </h2>
//         <textarea
//           className="w-full h-32 p-4 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 mb-4 resize-none bg-purple-50 text-blue-900 font-[cursive]"
//           placeholder="Describe your dream in detail..."
//           value={dream}
//           onChange={(e) => setDream(e.target.value)}
//         />
//         <div className="flex items-center gap-4 mb-4">
//           <label className="text-purple-700 font-semibold">Mood:</label>
//           <select
//             className="rounded-full px-4 py-2 bg-purple-100 text-blue-900 font-semibold"
//             value={mood}
//             onChange={(e) => setMood(e.target.value)}
//           >
//             {moods.map((m) => (
//               <option key={m.value} value={m.value}>
//                 {m.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button
//           className="bg-purple-400 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all text-lg flex items-center gap-2"
//           onClick={handleAnalyze}
//           disabled={loading || !dream}
//         >
//           {loading ? (
//             <span className="animate-spin mr-2">✨</span>
//           ) : (
//             <>
//               Analyze My Dream <span className="text-xl">✨</span>
//             </>
//           )}
//         </button>
//         {/* Result Display */}
//         <AnimatePresence>
//           {result && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               transition={{ duration: 0.6 }}
//               className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 shadow-inner relative"
//             >
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="absolute top-2 right-4 text-2xl"
//               >
//                 🔮
//               </motion.div>
//               <h3 className="text-lg font-bold text-purple-800 mb-2 flex items-center gap-2">
//                 Interpretation <span className="text-xl">🔮</span>
//               </h3>
//               <p className="text-blue-900">{result}</p>
//               <button
//                 className="mt-4 bg-blue-300 hover:bg-blue-400 text-white font-semibold py-2 px-6 rounded-full shadow transition-all"
//                 onClick={handleSave}
//               >
//                 Save to Diary <span className="text-xl">📔</span>
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//       {/* Dream Diary */}
//       <div className="w-full max-w-2xl">
//         <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
//           Your Dream Diary <span className="text-xl">📔</span>
//         </h2>
//         <div className="space-y-6">
//           {diary.length === 0 && (
//             <p className="text-purple-700 text-center opacity-70">
//               No dreams saved yet. Start journaling!
//             </p>
//           )}
//           <AnimatePresence>
//             {diary.map((entry, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 30, rotate: -2 }}
//                 animate={{ opacity: 1, y: 0, rotate: 0 }}
//                 exit={{ opacity: 0, y: 30, rotate: 2 }}
//                 transition={{ duration: 0.7 }}
//                 className="relative bg-white bg-opacity-90 rounded-2xl shadow-lg p-6"
//               >
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="absolute top-2 right-4 text-2xl"
//                 >
//                   {/* {entry.meaning.includes("snake") ? "🐍" : "🌑"} */}
//                 </motion.div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-blue-700 font-semibold">
//                     {entry.date}
//                   </span>
//                   <span className="text-xl">
//                     {moods.find((m) => m.value === entry.mood)?.label}
//                   </span>
//                 </div>
//                 <div className="font-[cursive] text-lg text-blue-900 mb-2">
//                   {entry.dream}
//                 </div>
//                 <div className="text-purple-700 font-semibold">
//                   Interpretation:
//                 </div>
//                 <div className="text-blue-900">{entry.meaning}</div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </div>
//     </main>
//   );
// }

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
  const [result, setResult] = useState("");
  const [diary, setDiary] = useState<
    { date: string; dream: string; mood: string; meaning: string }[]
  >([]);

  async function handleAnalyze() {
    setLoading(true);
    setResult("");
    // Replace with your FastAPI endpoint
    const res = await fetch("http://127.0.0.1:8000/api/analyze", {
      method: "POST",
      body: JSON.stringify({ dream, mood }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setResult(data.interpretation);
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
        meaning: result,
      },
    ]);
    setDream("");
    setResult("");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center font-nunito px-4 py-8">
      {/* Dream Entry Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 max-w-xl w-full mb-10 relative"
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
              className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 shadow-inner relative"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-2 right-4 text-2xl"
              >
                🔮
              </motion.div>
              <h3 className="text-lg font-bold text-purple-800 mb-2 flex items-center gap-2">
                Interpretation <span className="text-xl">🔮</span>
              </h3>
              <p className="text-blue-900">{result}</p>
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
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-700 font-semibold">
                    {entry.date}
                  </span>
                  <span className="text-xl">
                    {moods.find((m) => m.value === entry.mood)?.label}
                  </span>
                </div>
                <div className="font-[cursive] text-lg text-blue-900 mb-2">
                  {entry.dream}
                </div>
                <div className="text-purple-700 font-semibold">
                  Interpretation:
                </div>
                <div className="text-blue-900">{entry.meaning}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
