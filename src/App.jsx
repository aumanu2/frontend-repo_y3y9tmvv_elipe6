import { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import SearchBar from './components/SearchBar.jsx';
import RecipeList from './components/RecipeList.jsx';
import FunNote from './components/FunNote.jsx';
import Hero from './components/Hero.jsx';

// Sample dataset — a flavorful spread across the alphabet
const ALL_RECIPES = [
  { name: 'Apple Cinnamon Oatmeal', ingredients: ['apple', 'oats', 'cinnamon', 'milk', 'honey'] },
  { name: 'Banana Pancakes', ingredients: ['banana', 'flour', 'egg', 'milk', 'baking powder'] },
  { name: 'Chickpea Curry', ingredients: ['chickpeas', 'tomato', 'onion', 'garlic', 'curry powder'] },
  { name: 'Dum Aloo', ingredients: ['potato', 'yogurt', 'tomato', 'spices', 'onion'] },
  { name: 'Egg Fried Rice', ingredients: ['rice', 'egg', 'soy sauce', 'peas', 'spring onion'] },
  { name: 'Fudge Brownies', ingredients: ['cocoa', 'flour', 'butter', 'sugar', 'egg'] },
  { name: 'Garlic Butter Shrimp', ingredients: ['shrimp', 'garlic', 'butter', 'lemon', 'parsley'] },
  { name: 'Hummus Platter', ingredients: ['chickpeas', 'tahini', 'lemon', 'garlic', 'olive oil'] },
  { name: 'Iced Coffee Float', ingredients: ['coffee', 'ice cream', 'milk', 'sugar'] },
  { name: 'Jalapeño Poppers', ingredients: ['jalapeno', 'cream cheese', 'breadcrumbs', 'egg'] },
  { name: 'Kale Caesar Salad', ingredients: ['kale', 'parmesan', 'croutons', 'lemon', 'anchovy'] },
  { name: 'Lemon Garlic Chicken', ingredients: ['chicken', 'lemon', 'garlic', 'olive oil', 'thyme'] },
  { name: 'Mushroom Risotto', ingredients: ['arborio rice', 'mushroom', 'stock', 'butter', 'parmesan'] },
  { name: 'Nutty Granola', ingredients: ['oats', 'almonds', 'honey', 'coconut', 'raisin'] },
  { name: 'Orange Glazed Salmon', ingredients: ['salmon', 'orange', 'soy sauce', 'ginger', 'garlic'] },
  { name: 'Pesto Pasta', ingredients: ['pasta', 'basil', 'parmesan', 'pine nuts', 'olive oil'] },
  { name: 'Quinoa Veggie Bowl', ingredients: ['quinoa', 'broccoli', 'carrot', 'chickpeas', 'tahini'] },
  { name: 'Ratatouille', ingredients: ['eggplant', 'zucchini', 'tomato', 'pepper', 'onion'] },
  { name: 'Spicy Tofu Stir-fry', ingredients: ['tofu', 'soy sauce', 'chili', 'garlic', 'broccoli'] },
  { name: 'Tomato Basil Soup', ingredients: ['tomato', 'basil', 'cream', 'garlic', 'onion'] },
  { name: 'Udon Noodle Bowl', ingredients: ['udon', 'mushroom', 'soy sauce', 'scallion', 'egg'] },
  { name: 'Vanilla Chia Pudding', ingredients: ['chia', 'milk', 'vanilla', 'honey'] },
  { name: 'Waffle Sandwich', ingredients: ['waffle', 'egg', 'cheese', 'ham', 'maple syrup'] },
  { name: 'Xacuti Chicken', ingredients: ['chicken', 'coconut', 'chili', 'spices', 'onion'] },
  { name: 'Yogurt Parfait', ingredients: ['yogurt', 'granola', 'honey', 'berries'] },
  { name: 'Zesty Lime Rice', ingredients: ['rice', 'lime', 'cilantro', 'butter'] },
];

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const SEARCH_INPUT_ID = 'global-search';

export default function App() {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('alphabet'); // 'alphabet' | 'ingredient'

  const tokens = useMemo(() =>
    query
      .toLowerCase()
      .split(/[\s,]+/)
      .map((t) => t.trim())
      .filter(Boolean),
    [query]
  );

  const filtered = useMemo(() => {
    if (tokens.length === 0) return ALL_RECIPES;
    return ALL_RECIPES.filter((r) =>
      tokens.every((t) => r.name.toLowerCase().includes(t) || r.ingredients.some((i) => i.toLowerCase().includes(t)))
    );
  }, [tokens]);

  const handleJump = (anchorId) => {
    const el = document.getElementById(anchorId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const popularIngredients = useMemo(() => {
    const counts = new Map();
    ALL_RECIPES.forEach((r) => r.ingredients.forEach((i) => counts.set(i, (counts.get(i) || 0) + 1)));
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([i]) => i);
  }, []);

  const focusSearch = () => {
    const el = document.getElementById(SEARCH_INPUT_ID);
    if (el) {
      el.focus();
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-100 to-orange-50 text-stone-800">
      {/* Top header */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-amber-50/70 bg-amber-100/80 border-b border-amber-200">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🥄</span>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-stone-700">Recipepedia — The Brown Book</h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-amber-200/60 rounded-full p-1">
            <button
              onClick={() => setMode('alphabet')}
              className={`px-3 py-1.5 text-sm rounded-full transition ${
                mode === 'alphabet' ? 'bg-amber-500 text-white shadow' : 'text-stone-700 hover:bg-amber-300'
              }`}
            >
              A–Z
            </button>
            <button
              onClick={() => setMode('ingredient')}
              className={`px-3 py-1.5 text-sm rounded-full transition ${
                mode === 'ingredient' ? 'bg-amber-500 text-white shadow' : 'text-stone-700 hover:bg-amber-300'
              }`}
            >
              Ingredients
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-4">
          <SearchBar inputId={SEARCH_INPUT_ID} value={query} onChange={setQuery} onClear={() => setQuery('')} />
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 mt-6">
        <Hero onFocusSearch={focusSearch} />
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-6">
        {/* Sidebar content bar */}
        <aside className="lg:sticky lg:top-24 h-max">
          <Sidebar
            letters={LETTERS}
            popularIngredients={popularIngredients}
            mode={mode}
            onJump={handleJump}
            onPickIngredient={(ing) => setQuery(ing)}
          />
          <div className="mt-4">
            <FunNote />
          </div>
        </aside>

        {/* Main list */}
        <section>
          <RecipeList recipes={filtered} mode={mode} />

          {filtered.length === 0 && (
            <div className="text-center text-stone-600 bg-amber-100/60 border border-amber-200 rounded-xl p-8 mt-8">
              <p className="text-lg">No matches found. Try fewer ingredients or simpler words. 🫠</p>
            </div>
          )}
        </section>
      </main>

      <footer className="px-4 py-8 text-center text-sm text-stone-500">
        Made with a whisk of whimsy and a pinch of chaos. ☕🍫
      </footer>
    </div>
  );
}
