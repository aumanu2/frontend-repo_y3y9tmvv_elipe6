import Spline from '@splinetool/react-spline';
import { useEffect, useState } from 'react';

const NOTES = [
  "Today’s thought: Burnt toast is just extra-toasty toast. Marketing!",
  "Food math: If dessert is shared, the calories gossip and leave.",
  "Wisdom crumb: Season with salt, chaos, and a tiny dance.",
  "Kitchen fact: Stirring dramatically increases flavor by 12%.",
];

export default function Hero({ onFocusSearch }) {
  const [noteIndex, setNoteIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setNoteIndex((i) => (i + 1) % NOTES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative">
      <div className="relative h-[360px] sm:h-[420px] md:h-[520px] rounded-3xl overflow-hidden border border-amber-200 bg-amber-100 shadow-sm">
        <Spline scene="https://prod.spline.design/VyGeZv58yuk8j7Yy/scene.splinecode" style={{ width: '100%', height: '100%' }} />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-amber-50/90 via-amber-50/30 to-transparent" />

        <div className="absolute inset-0 flex items-end sm:items-center">
          <div className="w-full p-4 sm:p-8">
            <div className="max-w-3xl pointer-events-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 border border-amber-200 px-3 py-1 text-xs text-stone-700 shadow">
                <span className="text-amber-700">●</span> Interactive • Futuristic • Minimal
              </div>
              <h1 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-stone-800 drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                Recipepedia: Browse the Brown Aesthetic Pantry
              </h1>
              <p className="mt-2 sm:mt-3 text-stone-600 max-w-xl">
                Explore A–Z recipes or search by ingredients you have. Click the content bar to jump around like a caffeinated chef.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  onClick={onFocusSearch}
                  className="px-4 py-2 rounded-xl bg-amber-600 text-white shadow hover:bg-amber-700 active:scale-[0.98] transition"
                >
                  Find recipes with my ingredients
                </button>
                <span className="text-xs text-stone-500">or use the sidebar to jump A–Z</span>
              </div>

              <div className="mt-4 max-w-md rounded-2xl bg-white/80 backdrop-blur border border-amber-200 p-3 shadow-sm">
                <p className="text-sm text-stone-800">{NOTES[noteIndex]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
