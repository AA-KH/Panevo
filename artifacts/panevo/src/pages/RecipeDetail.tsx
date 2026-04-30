import { SEO } from "@/components/SEO";
import { Link, useRoute } from "wouter";
import { recipes } from "@/data/recipes";
import { ArrowLeft, Clock, Flame, Info } from "lucide-react";
import NotFound from "./not-found";
import { Reveal } from "@/components/motion/Reveal";

export default function RecipeDetail() {
  const [, params] = useRoute("/recipes/:slug");
  const slug = params?.slug;

  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) {
    return <NotFound />;
  }

  const recipeSchema = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": recipe.title,
    "description": recipe.description,
    "prepTime": "PT0M",
    "cookTime": `PT${recipe.time.replace(/[^0-9]/g, '')}M`,
    "totalTime": `PT${recipe.time.replace(/[^0-9]/g, '')}M`,
    "recipeYield": "1 serving",
    "recipeIngredient": recipe.ingredients,
    "recipeInstructions": recipe.method.map((step, index) => ({
      "@type": "HowToStep",
      "text": step
    })),
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": `${recipe.macros.calories} kcal`,
      "proteinContent": `${recipe.macros.protein} grams`,
      "fatContent": `${recipe.macros.fat} grams`,
      "carbohydrateContent": `${recipe.macros.carbs} grams`
    }
  };

  return (
    <div className="w-full bg-background min-h-screen">
      <SEO
        title={recipe.title}
        description={recipe.description}
        schema={JSON.stringify(recipeSchema)}
      />

      <div className="container px-4 py-8">
        <Link href="/recipes" className="nav-link inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Recipes
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Image & CTA */}
          <Reveal className="w-full lg:w-5/12 space-y-8">
            <div className="aspect-[4/5] bg-muted relative overflow-hidden border border-border" style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}>
              <div className="absolute inset-0 bg-secondary/5 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-muted-foreground font-bold uppercase tracking-widest mb-2">Recipe Photo</span>
                <span className="text-sm font-medium text-foreground">{recipe.title}</span>
              </div>
            </div>

            <div className="bg-card border border-border p-6 text-center" style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}>
              <h4 className="text-lg text-foreground mb-2 uppercase">Need this flavour?</h4>
              <p className="text-sm text-muted-foreground mb-4">This recipe uses PANEVO {recipe.flavour}.</p>
              <Link href="/products" className="cta-primary bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold text-sm inline-block notch-br hover:bg-primary/90 transition-colors w-full">
                Order {recipe.flavour}
              </Link>
            </div>
          </Reveal>

          {/* Right Column - Content */}
          <div className="w-full lg:w-7/12">
            <Reveal>
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{recipe.flavour}</span>
                {recipe.tags.map(tag => (
                  <span key={tag} className="bg-accent/20 text-accent-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{tag}</span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-4xl md:text-6xl mb-4 text-foreground">{recipe.title}</h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{recipe.description}</p>
            </Reveal>

            <Reveal delay={240}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                <div className="card-lift bg-card border border-border p-4 text-center" style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}>
                  <Clock className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground uppercase font-bold">Total Time</p>
                  <p className="font-bold text-foreground tabnums">{recipe.time}</p>
                </div>
                <div className="card-lift bg-card border border-border p-4 text-center" style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}>
                  <Flame className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground uppercase font-bold">Calories</p>
                  <p className="tabnums font-bold text-foreground">{recipe.macros.calories}</p>
                </div>
                <div className="card-lift bg-card border border-border p-4 text-center" style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}>
                  <div className="w-5 h-5 mx-auto mb-2 text-primary font-bold">P</div>
                  <p className="text-xs text-muted-foreground uppercase font-bold">Protein</p>
                  <p className="tabnums font-bold text-foreground">{recipe.macros.protein}g</p>
                </div>
                <div className="card-lift bg-card border border-border p-4 text-center" style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}>
                  <div className="w-5 h-5 mx-auto mb-2 text-muted-foreground font-bold">C</div>
                  <p className="text-xs text-muted-foreground uppercase font-bold">Carbs</p>
                  <p className="tabnums font-bold text-foreground">{recipe.macros.carbs}g</p>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Reveal>
                <h3 className="text-2xl mb-6 text-foreground border-b border-border pb-2 uppercase">Ingredients</h3>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground">
                      <span className="text-primary mt-1">✓</span>
                      <span className="leading-relaxed">{ing}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={120}>
                <h3 className="text-2xl mb-6 text-foreground border-b border-border pb-2 uppercase">Method</h3>
                <ol className="space-y-6">
                  {recipe.method.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-bold text-muted-foreground tabnums bg-muted w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-foreground leading-relaxed pt-1">{step}</span>
                    </li>
                  ))}
                </ol>

                {recipe.chefTip && (
                  <div className="mt-8 bg-muted p-6 border border-border" style={{ borderRadius: 12 }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-5 h-5 text-primary" />
                      <h4 className="font-bold text-foreground uppercase" style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.02em" }}>Chef's Tip</h4>
                    </div>
                    <p className="text-muted-foreground text-sm italic">{recipe.chefTip}</p>
                  </div>
                )}
              </Reveal>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
