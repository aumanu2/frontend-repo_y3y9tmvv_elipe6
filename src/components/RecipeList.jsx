function SectionHeader({ id, title, subtitle }) {
  return (
    <div id={id} className="scroll-mt-24">
      <h2 className="text-lg font-semibold text-stone-800 flex items-baseline gap-2">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-white">🍪</span>
        {title}
      </h2>
      {subtitle && <p className="text-xs text-stone-500 mt-1">{subtitle}</p>}
    </div>
  );
}

function RecipeCard({ recipe }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-white/70 backdrop-blur p-4 hover:shadow-md transition shadow-sm">
      <h3 className="font-medium text-stone-800">{recipe.name}</h3>
      <p className="text-sm text-stone-600 mt-1">{recipe.ingredients.join(', ')}</p>
      <div className="mt-3 flex items-center gap-2 text-xs text-stone-500">
        <span className="px-2 py-0.5 rounded-full bg-amber-100 border border-amber-200">{recipe.ingredients.length} ingredients</span>
        <span className="px-2 py-0.5 rounded-full bg-orange-100 border border-orange-200">brown-approved ✨</span>
      </div>
    </div>
  );
}

export default function RecipeList({ recipes, mode }) {
  if (mode === 'ingredient') {
    // Group by first ingredient letter for a quirky index
    const byFirstIngredient = recipes.reduce((acc, r) => {
      const key = (r.ingredients[0] || 'misc')[0].toUpperCase();
      acc[key] = acc[key] || [];
      acc[key].push(r);
      return acc;
    }, {});
    const groups = Object.keys(byFirstIngredient).sort();

    return (
      <div className="space-y-8">
        {groups.map((g) => (
          <div key={g} className="space-y-3">
            <SectionHeader id={`ingredient-${g}`} title={`${g} — Ingredient Alley`} subtitle={`Recipes starting with ${g.toUpperCase()} ingredient`} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {byFirstIngredient[g]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((r) => (
                  <RecipeCard key={r.name} recipe={r} />
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Alphabet mode: group by first letter of recipe name
  const byLetter = recipes.reduce((acc, r) => {
    const key = r.name[0].toUpperCase();
    acc[key] = acc[key] || [];
    acc[key].push(r);
    return acc;
  }, {});
  const letters = Object.keys(byLetter).sort();

  return (
    <div className="space-y-8">
      {letters.map((L) => (
        <div key={L} className="space-y-3">
          <SectionHeader id={`letter-${L}`} title={`${L} — The A–Z Pantry`} subtitle={`Everything delicious that starts with ${L}`} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {byLetter[L]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((r) => (
                <RecipeCard key={r.name} recipe={r} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
