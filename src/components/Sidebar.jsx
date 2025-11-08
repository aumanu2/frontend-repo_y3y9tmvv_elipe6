import { useMemo } from 'react';

export default function Sidebar({ letters, popularIngredients, mode, onJump, onPickIngredient }) {
  const sections = useMemo(() => {
    if (mode === 'alphabet') return letters;
    return popularIngredients;
  }, [letters, popularIngredients, mode]);

  return (
    <nav className="rounded-2xl bg-amber-100/70 border border-amber-200 p-3 shadow-sm">
      <h2 className="text-sm font-semibold text-stone-700 mb-2 flex items-center gap-2">
        <span>🍫</span> Quick Jumps
      </h2>

      <div className="grid grid-cols-6 gap-2">
        {sections.map((s) => (
          <button
            key={s}
            onClick={() => onJump(`${mode === 'alphabet' ? 'letter' : 'ingredient'}-${s}`)}
            className="text-xs px-2 py-1 rounded-md bg-amber-200 hover:bg-amber-300 text-stone-800 transition active:scale-[0.98]"
          >
            {mode === 'alphabet' ? s : s.length > 8 ? `${s.slice(0, 7)}…` : s}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="text-xs uppercase tracking-wide text-stone-500 mb-2">Pick an ingredient</h3>
        <div className="flex flex-wrap gap-2">
          {popularIngredients.map((ing) => (
            <button
              key={ing}
              onClick={() => onPickIngredient(ing)}
              className="text-xs px-2 py-1 rounded-full bg-white border border-amber-200 hover:bg-amber-50 text-stone-700"
            >
              {ing}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
