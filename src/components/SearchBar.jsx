import { useRef } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ inputId, value, onChange, onClear }) {
  const inputRef = useRef(null);

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-2xl border border-amber-300 bg-white/70 backdrop-blur px-3 py-2 shadow-sm focus-within:ring-2 ring-amber-400">
        <Search className="w-5 h-5 text-amber-700" />
        <input
          id={inputId}
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by ingredient or recipe name… e.g. tomato, rice"
          className="w-full bg-transparent outline-none placeholder:text-stone-400 text-stone-800"
        />
        {value && (
          <button
            aria-label="Clear"
            onClick={() => {
              onClear();
              inputRef.current?.focus();
            }}
            className="p-1 rounded hover:bg-amber-100 text-amber-800"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <p className="mt-2 text-xs text-stone-500">
        Hint: separate multiple ingredients with commas. We'll cook up matches that use them all. 🍳
      </p>
    </div>
  );
}
