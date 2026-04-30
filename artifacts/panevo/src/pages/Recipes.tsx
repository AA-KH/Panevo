import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { recipes } from "@/data/recipes";
import { useState } from "react";
import { ArrowRight, Clock } from "lucide-react";

export default function Recipes() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Black Pepper", "Red Chilli Flakes", "Oregano", "Under 10 min", "High Protein"];

  const filteredRecipes = recipes.filter(recipe => {
    if (activeFilter === "All") return true;
    if (["Black Pepper", "Red Chilli Flakes", "Oregano"].includes(activeFilter)) {
      return recipe.flavour === activeFilter;
    }
    return recipe.tags.includes(activeFilter);
  });

  return (
    <div className="w-full">
      <SEO
        title="Recipes"
        description="High protein, under 10 minutes. Stop marinating, start cooking."
      />

      {/* HERO */}
      <section className="bg-primary text-primary-foreground py-24 text-center">
        <div className="container px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Don't Overthink Dinner.</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">High protein. Under 10 minutes. Because the flavour is already in the paneer.</p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="bg-background py-8 border-b border-border sticky top-16 z-30">
        <div className="container px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                  activeFilter === filter ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-border'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RECIPE GRID */}
      <section className="bg-background py-20">
        <div className="container px-4">
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredRecipes.map((recipe) => (
                <Link key={recipe.slug} href={`/recipes/${recipe.slug}`} className="group bg-card border border-border rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all flex flex-col sm:flex-row">
                  <div className="w-full sm:w-2/5 aspect-square sm:aspect-auto bg-muted relative overflow-hidden">
                     {/* Image placeholder */}
                     <div className="absolute inset-0 bg-secondary/5 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                        <span className="text-muted-foreground font-bold uppercase text-xs tracking-wider">Recipe Photo</span>
                     </div>
                     <div className="absolute top-4 left-4 bg-background/90 backdrop-blur text-foreground px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {recipe.time}
                     </div>
                  </div>
                  <div className="p-6 w-full sm:w-3/5 flex flex-col justify-center">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">{recipe.flavour}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{recipe.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{recipe.description}</p>
                    
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="text-center">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Protein</p>
                        <p className="font-mono font-bold text-foreground">{recipe.macros.protein}g</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Kcal</p>
                        <p className="font-mono font-bold text-foreground">{recipe.macros.calories}</p>
                      </div>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-muted-foreground">
              No recipes found for this filter.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
