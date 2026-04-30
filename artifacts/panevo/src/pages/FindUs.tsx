import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { QCOM_LINKS } from "@/config/platforms";
import { stores } from "@/data/stores";
import { useState } from "react";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { track } from "@/lib/analytics";

export default function FindUs() {
  const [activeCity, setActiveCity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const cities = ["All", ...Array.from(new Set(stores.map(s => s.city)))];

  const filteredStores = stores.filter(store => {
    const matchesCity = activeCity === "All" || store.city === activeCity;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          store.area.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const handleQComClick = (platform: string) => {
    track("qcom_click", { platform, source_page: "/find-us", source_element: "qcom_tiles" });
  };

  return (
    <div className="w-full">
      <SEO
        title="Find Us"
        description="Delivered in 10 minutes on Blinkit, Zepto, and Instamart. Or find PANEVO at your nearest store."
      />

      {/* HERO */}
      <section className="bg-primary text-primary-foreground py-24 text-center">
        <div className="container px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">PANEVO is Closer Than You Think.</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">Delivered in 10 minutes on Blinkit, Zepto, and Swiggy Instamart — or find us at your nearest store across Chandigarh Tri-City and Gurgaon.</p>
        </div>
      </section>

      {/* Q-COMMERCE */}
      <section className="bg-background py-20 border-b border-border">
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Delivered in 10 Minutes.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(QCOM_LINKS).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleQComClick(platform)}
                className="bg-card border border-border p-8 rounded-xl text-center hover:-translate-y-2 hover:shadow-lg hover:border-primary transition-all group"
              >
                <div className="h-16 bg-muted rounded-lg mb-6 flex items-center justify-center font-bold text-muted-foreground uppercase">{platform} LOGO</div>
                <div className="inline-flex items-center gap-2 text-primary font-bold text-lg">
                  Order Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STORE LOCATOR */}
      <section className="bg-muted py-20">
        <div className="container px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Find Us In-Store</h2>
          
          <div className="flex flex-col lg:flex-row gap-8 bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            
            {/* Map Placeholder */}
            <div className="w-full lg:w-1/2 bg-slate-200 min-h-[400px] relative flex flex-col items-center justify-center p-8 text-center border-b lg:border-b-0 lg:border-r border-border">
              <MapPin className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground font-medium max-w-xs">Google Maps API Integration pending for Phase 2.</p>
              <p className="text-xs text-muted-foreground mt-2">Will display pins for all listed stores.</p>
            </div>

            {/* List and Filters */}
            <div className="w-full lg:w-1/2 p-6 flex flex-col max-h-[600px]">
              
              <div className="flex gap-2 overflow-x-auto pb-4 mb-4 hide-scrollbar">
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => setActiveCity(city)}
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                      activeCity === city ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-border'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search stores or areas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="overflow-y-auto pr-2 space-y-4 flex-1 custom-scrollbar">
                {filteredStores.length > 0 ? (
                  filteredStores.map(store => (
                    <div key={store.id} className="p-4 border border-border rounded-lg bg-background hover:border-primary/50 transition-colors">
                      <h4 className="font-bold text-foreground text-lg mb-1">{store.name}</h4>
                      <p className="text-primary font-bold text-sm mb-2">{store.area}, {store.city}</p>
                      <p className="text-sm text-muted-foreground">{store.address}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    No stores found matching your criteria.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REQUEST CITY */}
      <section className="bg-secondary text-secondary-foreground py-24 text-center">
        <div className="container px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-6 text-white">Not in your city yet?</h2>
          <p className="text-lg opacity-80 mb-10">We are expanding rapidly. Tell us where we should go next.</p>
          
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks! We've recorded your request."); }}>
             <input
               type="text"
               required
               placeholder="Your City"
               className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-3 rounded-md focus:outline-none focus:border-primary"
             />
             <input
               type="email"
               required
               placeholder="Your Email"
               className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-3 rounded-md focus:outline-none focus:border-primary"
             />
             <button type="submit" className="bg-primary text-white px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors notch-br">
               Submit
             </button>
          </form>
        </div>
      </section>

    </div>
  );
}
