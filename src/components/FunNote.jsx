import { useEffect, useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';

const NOTES = [
  "Fun fact: Chocolate used to be a drink. Now it's basically a personality.",
  "Chef's tip: If at first you don't succeed, order pizza. Research, obviously.",
  "Did you know? The word 'salary' comes from salt. We pay in snacks here.",
  "Pro move: Taste as you go. Science calls it QA. We call it yum.",
  "Silly thought: A balanced diet is a cookie in each hand.",
  "Food lore: Tomatoes were once feared. Now they're in like... everything.",
  "Tiny truth: Leftovers are just food planning victory laps.",
];

export default function FunNote() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * NOTES.length));
  const note = useMemo(() => NOTES[index % NOTES.length], [index]);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => i + 1), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-200/70 via-amber-100 to-orange-100 p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-9 h-9 rounded-full bg-amber-500 text-white grid place-items-center shadow">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm text-stone-800">{note}</p>
          <p className="text-xs text-stone-500 mt-2">New nibble every few seconds. Share yours with a sticky note on the fridge (aka your brain).</p>
        </div>
      </div>
    </div>
  );
}
