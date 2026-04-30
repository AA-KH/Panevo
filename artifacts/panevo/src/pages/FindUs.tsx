import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { QCOM_LINKS } from "@/config/platforms";
import { stores } from "@/data/stores";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";

export default function FindUs() {
  const [activeCity, setActiveCity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [cityRequest, setCityRequest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

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

  const handleCityRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, city: cityRequest, source: "city-request" })
      });
      if (!res.ok) throw new Error("Failed to submit request");
      track("waitlist_signup", { source: "city-request", city: cityRequest });
      toast.success("Thanks! We've recorded your request.");
      setEmail("");
      setCityRequest("");
    } catch (err) {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    track("page_view", { page: "/find-us" });

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (apiKey && mapRef.current && !window.google?.maps) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = () => {
        const map = new window.google.maps.Map(mapRef.current!, {
          center: { lat: 30.7333, lng: 76.7794 }, // Chandigarh
          zoom: 11,
          styles: [
            { "featureType": "all", "elementType": "geometry", "stylers": [{"color": "#F2EEE5"}] },
            { "featureType": "poi", "elementType": "geometry", "stylers": [{"color": "#e5dfd3"}] },
            { "featureType": "water", "elementType": "geometry", "stylers": [{"color": "#c4cfca"}] }
          ]
        });

        stores.forEach(store => {
          if (store.lat && store.lng) {
            new window.google.maps.Marker({
              position: { lat: store.lat, lng: store.lng },
              map,
              title: store.name,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: '#BF3D0B',
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 8
              }
            });
          }
        });
      };
      document.head.appendChild(script);
    } else if (window.google?.maps && mapRef.current) {
       window.initMap?.();
    }
  }, []);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://panevo.in" },
        { "@type": "ListItem", "position": 2, "name": "Find Us", "item": "https://panevo.in/find-us" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.findUs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
      }))
    }
  ];

  return (
    <div className="w-full">
      <SEO
        title="Find Us"
        description="Delivered in 10 minutes on Blinkit, Zepto, and Instamart. Or find PANEVO at your nearest store."
        structuredData={structuredData}
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
            <div ref={mapRef} className="w-full lg:w-1/2 bg-slate-200 min-h-[400px] relative flex flex-col items-center justify-center p-8 text-center border-b lg:border-b-0 lg:border-r border-border">
              {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
                <>
                  <MapPin className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
                  <p className="text-muted-foreground font-medium max-w-xs">Map preview — interactive map activates with API key.</p>
                </>
              )}
            </div>

            {/* List and Filters */}
            <div className="w-full lg:w-1/2 p-6 flex flex-col max-h-[600px]">
              
              <div className="flex gap-2 overflow-x-auto pb-4 mb-4 hide-scrollbar">
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => setActiveCity(city)}
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary ${
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
          
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleCityRequest}>
             <input
               type="text"
               required
               value={cityRequest}
               onChange={e => setCityRequest(e.target.value)}
               placeholder="Your City"
               className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-3 rounded-md focus:outline-none focus:border-primary"
             />
             <input
               type="email"
               required
               value={email}
               onChange={e => setEmail(e.target.value)}
               placeholder="Your Email"
               className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-3 rounded-md focus:outline-none focus:border-primary"
             />
             <button disabled={isSubmitting} type="submit" className="bg-primary text-white px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors notch-br disabled:opacity-50">
               {isSubmitting ? "Submitting..." : "Submit"}
             </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-24">
        <div className="container px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Storage & Quality</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.findUs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left font-bold text-lg hover:text-primary transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

    </div>
  );
}