import { SEO } from "@/components/SEO";
import { Shatkona } from "@/components/sections/Shatkona";
import { roadmap } from "@/data/roadmap";
import { useState } from "react";
import { track } from "@/lib/analytics";

export default function OurStory() {
  const [email, setEmail] = useState("");

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    track("waitlist_signup", { source: "roadmap-phase2" });
    console.log("Waitlist signup:", email);
    alert("Thanks! We'll keep you updated.");
    setEmail("");
  };

  return (
    <div className="w-full">
      <SEO
        title="Our Story"
        description="How we decided to fix paneer. A brand doesn't start with a product, it starts with a problem."
      />

      {/* HERO */}
      <section className="bg-primary text-primary-foreground py-24 text-center">
        <div className="container px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">How We Decided to Fix Paneer.</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">A brand doesn't start with a product. It starts with a problem nobody else is bothered to solve.</p>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-background py-20 md:py-32">
        <div className="container px-4 max-w-3xl mx-auto prose prose-lg md:prose-xl text-foreground font-sans prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground">
          
          <p className="lead font-medium text-foreground text-2xl">
            We love paneer. Every Indian household does. But we hated the process. 
            The chopping, the marination, the messy hands, the 30-minute wait before 
            you even turn on the stove. We realised we were treating a convenient 
            protein like a weekend project.
          </p>

          <blockquote className="border-l-4 border-primary pl-6 my-12 text-2xl font-bold italic text-foreground">
            "Why is the most consumed vegetarian protein in the country still stuck in its raw, unseasoned format?"
          </blockquote>

          <p>
            We looked at the dairy aisle. Ten brands selling the exact same white block. 
            They competed on terms like "farm-fresh" and "creamy," but nobody was actually 
            innovating the product itself. They were just changing the packaging.
          </p>

          <p>
            So we started experimenting in our kitchen. We tried marinating, but it only 
            coated the surface. We needed the flavour inside. We collaborated with dairy 
            technologists at Kamdhenu Hitkari Manch and researchers at ICAR-NDRI Karnal to figure out how to infuse 
            real spices into the milk exactly at the point of curdling. 
          </p>

          <div className="bg-muted p-8 rounded-xl my-12 border border-border">
             <h3 className="text-foreground mt-0">DPIIT Recognised</h3>
             <p className="mb-0 text-muted-foreground text-base">Our innovative infusion process earned PANEVO formal recognition as an innovative startup by the Department for Promotion of Industry and Internal Trade (DPIIT), Government of India.</p>
          </div>

          <p>
            The result? Black Pepper that bites back. Red Chilli Flakes with deep, 
            sustained heat. Oregano that transforms a simple wrap. 
          </p>

          <p>
            We took it to Chitkara University. We set up a tawa, sliced the paneer right 
            out of the pack, and pan-fried it with a drop of oil. No masala box. 
            No waiting. Within hours, we sold out. 76% of people who tasted it asked 
            where they could buy it weekly. That's when we knew we hadn't just made a 
            better paneer; we had fixed the category.
          </p>
        </div>
      </section>

      {/* SHATKONA SYMBOL */}
      <section className="bg-secondary text-secondary-foreground py-24 text-center border-t border-border/20">
        <div className="container px-4">
          <Shatkona className="w-32 h-32 mx-auto mb-12 text-primary" />
          <h2 className="text-3xl font-bold mb-8">The Union of Opposites</h2>
          <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
            <span className="text-primary font-bold">△ is fire.</span> The heat, the spice, the transformation.<br/><br/>
            <span className="text-[#3b82f6] font-bold">▽ is water.</span> The milk, the cool, the nourishment.<br/><br/>
            Together: the Shatkona — the union of opposites.
          </p>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-background py-24">
        <div className="container px-4">
          <h2 className="text-4xl font-bold mb-16 text-center text-foreground">The People Behind the Paneer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Harviinder", title: "Co-Founder", bio: "Obsessed with food systems and consumer behavior. Saw the gap in the dairy aisle and decided to build the bridge." },
              { name: "Shwetta", title: "Co-Founder", bio: "The operational force. Turns bold ideas into scalable, consistent products that taste the same in every single pack." },
              { name: "Palvit", title: "Head of Operations & R&D", bio: "The flavour architect. Spends his days balancing milk temperatures and spice densities to achieve the perfect infusion." },
              { name: "Sandeep [Placeholder]", title: "Mentor & Senior Advisor", bio: "Industry veteran guiding the strategic vision and institutional partnerships." }
            ].map(member => (
              <div key={member.name} className="bg-card border border-border rounded-xl overflow-hidden text-center group">
                <div className="aspect-square bg-muted flex items-center justify-center text-muted-foreground text-4xl font-bold font-serif group-hover:bg-primary/5 transition-colors">
                  {member.name[0]}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1 text-foreground">{member.name}</h3>
                  <p className="text-primary text-sm font-bold uppercase tracking-wider mb-4">{member.title}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="bg-muted py-24 border-t border-border">
        <div className="container px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">The Bold Roadmap</h2>
            <p className="text-muted-foreground">We're just getting started.</p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-border mb-16">
            {roadmap.map((phase, i) => (
              <div key={i} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-${phase.status}`}>
                {/* Timeline dot */}
                <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1.5 md:-translate-x-1/2 border-4 border-background z-10 ${
                  phase.status === 'live' ? 'bg-accent' : 
                  phase.status === 'upcoming' ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}></div>
                
                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-5/12 p-6 rounded-xl border ${
                  phase.status === 'live' ? 'bg-card border-border shadow-sm' : 
                  phase.status === 'upcoming' ? 'bg-primary/5 border-primary shadow-md scale-105 z-20 relative' : 
                  'bg-transparent border-border/50 opacity-60'
                }`}>
                  <h3 className="font-bold text-lg mb-4 text-foreground">{phase.phase}</h3>
                  <ul className="space-y-2">
                    {phase.flavours.map(f => (
                      <li key={f} className="text-muted-foreground font-medium flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${phase.status === 'live' || phase.status === 'upcoming' ? 'bg-primary' : 'bg-border'}`}></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card p-8 rounded-xl border border-border text-center shadow-sm">
             <h3 className="font-bold text-xl mb-4 text-foreground">Want to be the first to taste Phase 2?</h3>
             <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
               <input
                 type="email"
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="Enter your email"
                 className="flex-1 bg-background border border-border text-foreground px-4 py-3 rounded-md focus:outline-none focus:border-primary"
               />
               <button type="submit" className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors whitespace-nowrap">
                 Notify Me
               </button>
             </form>
          </div>

        </div>
      </section>
    </div>
  );
}
