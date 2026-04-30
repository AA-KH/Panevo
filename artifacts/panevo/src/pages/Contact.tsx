import { SEO } from "@/components/SEO";
import { useState, useEffect } from "react";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { BRAND } from "@/config/brand";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { Reveal } from "@/components/motion/Reveal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [tradeData, setTradeData] = useState({
    name: "",
    businessName: "",
    city: "",
    type: "Retailer",
    monthlyVolume: "",
    message: ""
  });
  const [isTradeSubmitting, setIsTradeSubmitting] = useState(false);
  const [isTradeMode, setIsTradeMode] = useState(false);

  useEffect(() => {
    track("page_view", { page: "/contact" });
  }, []);

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Failed to send message");
      track("contact_form_submit", { subject: formData.subject });
      toast.success("Message sent successfully. We will get back to you shortly.");
      setFormData({ name: "", email: "", phone: "", subject: "general", message: "" });
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTradeSubmitting(true);
    try {
      const res = await fetch("/api/trade-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tradeData)
      });
      if (!res.ok) throw new Error("Failed to submit trade enquiry");
      track("trade_enquiry_submit", { type: tradeData.type, city: tradeData.city });
      toast.success("Enquiry submitted successfully. Our trade team will contact you.");
      setTradeData({ name: "", businessName: "", city: "", type: "Retailer", monthlyVolume: "", message: "" });
    } catch (err) {
      toast.error("Failed to submit enquiry. Please try again.");
    } finally {
      setIsTradeSubmitting(false);
    }
  };

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://panevo.in" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://panevo.in/contact" }
      ]
    }
  ];

  return (
    <div className="w-full">
      <SEO
        title="Contact Us"
        description="Get in touch with the PANEVO team for general inquiries, trade partnerships, or feedback."
        structuredData={structuredData}
      />

      {/* HERO */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24 text-center">
        <div className="container px-4">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl md:text-7xl mb-6">We're Real People. Get in Touch.</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">We're a small team. We read everything. We reply fast.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Contact Info */}
            <Reveal className="w-full lg:w-1/3 space-y-12">
              <div>
                <h3 className="text-2xl mb-6 text-foreground uppercase">Direct Contacts</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-bold text-foreground">General Enquiries</p>
                      <a href={`mailto:${BRAND.emails[0]}`} className="text-muted-foreground hover:text-primary">{BRAND.emails[0]}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-bold text-foreground">Trade & Distribution</p>
                      <a href={`mailto:${BRAND.emails[1]}`} className="text-muted-foreground hover:text-primary">{BRAND.emails[1]}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MessageCircle className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-bold text-foreground">WhatsApp Support</p>
                      <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">{BRAND.phones[0]}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl mb-4 text-foreground uppercase">Registered Office</h3>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div className="text-muted-foreground">
                    <p className="font-bold text-foreground mb-1">{BRAND.parentCompany}</p>
                    <p>{BRAND.placeholders.address}</p>
                    <p>India</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Contact Form */}
            <Reveal delay={120} className="w-full lg:w-2/3">
              <div className="bg-card border border-border p-8" style={{ borderRadius: 12, boxShadow: "var(--shadow-rest)" }}>
              <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
                <h3 className="text-2xl text-foreground uppercase">Send a Message</h3>
                <div className="flex gap-2 bg-muted p-1" style={{ borderRadius: 8 }}>
                  <button onClick={() => setIsTradeMode(false)} className={`px-4 py-2 text-sm font-bold transition-colors ${!isTradeMode ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`} style={{ borderRadius: 6 }}>General</button>
                  <button onClick={() => setIsTradeMode(true)} className={`px-4 py-2 text-sm font-bold transition-colors ${isTradeMode ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`} style={{ borderRadius: 6 }}>Trade</button>
                </div>
              </div>

              {!isTradeMode ? (
                <form onSubmit={handleGeneralSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-bold text-foreground">Full Name</label>
                      <input id="name" type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-background border border-border focus:outline-none focus:border-primary" style={{ borderRadius: 8 }} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-bold text-foreground">Email Address</label>
                      <input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 bg-background border border-border focus:outline-none focus:border-primary" style={{ borderRadius: 8 }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-bold text-foreground">Phone Number (Optional)</label>
                      <input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-3 bg-background border border-border focus:outline-none focus:border-primary" style={{ borderRadius: 8 }} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-bold text-foreground">Subject</label>
                      <select id="subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full p-3 bg-background border border-border focus:outline-none focus:border-primary" style={{ borderRadius: 8 }}>
                        <option value="general">General Enquiry</option>
                        <option value="feedback">Product Feedback</option>
                        <option value="press">Press / Media</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-foreground">Message</label>
                    <textarea id="message" required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full p-3 bg-background border border-border focus:outline-none focus:border-primary resize-none" style={{ borderRadius: 8 }}></textarea>
                  </div>
                  <button disabled={isSubmitting} type="submit" className="cta-primary bg-primary text-primary-foreground px-8 py-4 font-bold w-full hover:bg-primary/90 transition-colors notch-br disabled:opacity-50" style={{ borderRadius: 4 }}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleTradeSubmit} className="space-y-6 wizard-step-enter">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="tradeName" className="text-sm font-bold text-foreground">Contact Name</label>
                      <input id="tradeName" type="text" required value={tradeData.name} onChange={(e) => setTradeData({...tradeData, name: e.target.value})} className="w-full p-3 bg-background border border-border focus:outline-none focus:border-primary" style={{ borderRadius: 8 }} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="businessName" className="text-sm font-bold text-foreground">Business Name</label>
                      <input id="businessName" type="text" required value={tradeData.businessName} onChange={(e) => setTradeData({...tradeData, businessName: e.target.value})} className="w-full p-3 bg-background border border-border focus:outline-none focus:border-primary" style={{ borderRadius: 8 }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-bold text-foreground">City</label>
                      <input id="city" type="text" required value={tradeData.city} onChange={(e) => setTradeData({...tradeData, city: e.target.value})} className="w-full p-3 bg-background border border-border focus:outline-none focus:border-primary" style={{ borderRadius: 8 }} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="type" className="text-sm font-bold text-foreground">Business Type</label>
                      <select id="type" value={tradeData.type} onChange={(e) => setTradeData({...tradeData, type: e.target.value})} className="w-full p-3 bg-background border border-border focus:outline-none focus:border-primary" style={{ borderRadius: 8 }}>
                        <option value="Retailer">Retailer (Grocery / Supermarket)</option>
                        <option value="Distributor">Distributor / Wholesaler</option>
                        <option value="HORECA">HORECA (Restaurant / Cafe)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="monthlyVolume" className="text-sm font-bold text-foreground">Expected Monthly Volume (Optional)</label>
                    <input id="monthlyVolume" type="text" placeholder="e.g. 50kg, 200 packs" value={tradeData.monthlyVolume} onChange={(e) => setTradeData({...tradeData, monthlyVolume: e.target.value})} className="w-full p-3 bg-background border border-border focus:outline-none focus:border-primary" style={{ borderRadius: 8 }} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="tradeMessage" className="text-sm font-bold text-foreground">Additional Details</label>
                    <textarea id="tradeMessage" required rows={4} value={tradeData.message} onChange={(e) => setTradeData({...tradeData, message: e.target.value})} className="w-full p-3 bg-background border border-border focus:outline-none focus:border-primary resize-none" style={{ borderRadius: 8 }}></textarea>
                  </div>
                  <div className="space-y-3">
                    <button disabled={isTradeSubmitting} type="submit" className="cta-primary bg-primary text-primary-foreground px-8 py-4 font-bold w-full hover:bg-primary/90 transition-colors notch-br disabled:opacity-50" style={{ borderRadius: 4 }}>
                      {isTradeSubmitting ? "Submitting..." : "Submit Trade Enquiry"}
                    </button>
                    <p className="text-sm text-muted-foreground text-center">
                      Our team responds within 48 hours.
                    </p>
                  </div>
                </form>
              )}
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </div>
  );
}