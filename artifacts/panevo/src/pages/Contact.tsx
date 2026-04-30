import { SEO } from "@/components/SEO";
import { useState } from "react";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert("Message sent successfully. We will get back to you shortly.");
    setFormData({ name: "", email: "", phone: "", subject: "general", message: "" });
  };

  return (
    <div className="w-full">
      <SEO
        title="Contact Us"
        description="Get in touch with the PANEVO team for general inquiries, trade partnerships, or feedback."
      />

      {/* HERO */}
      <section className="bg-primary text-primary-foreground py-24 text-center">
        <div className="container px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Let's Talk.</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">Whether you're a customer, a retailer, or just curious about what we do.</p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Contact Info */}
            <div className="w-full lg:w-1/3 space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Direct Contacts</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-bold text-foreground">General Enquiries</p>
                      <a href="mailto:hello@panevo.in" className="text-muted-foreground hover:text-primary">hello@panevo.in</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-bold text-foreground">Trade & Distribution</p>
                      <a href="mailto:trade@panevo.in" className="text-muted-foreground hover:text-primary">trade@panevo.in</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MessageCircle className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-bold text-foreground">WhatsApp Support</p>
                      <a href="https://wa.me/918975016500" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">+91 89750 16500</a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Registered Office</h3>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div className="text-muted-foreground">
                    <p className="font-bold text-foreground mb-1">Shatkona Ventures Private Limited</p>
                    <p>[Street Address Placeholder]</p>
                    <p>[City, State, PIN Placeholder]</p>
                    <p>India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full lg:w-2/3 bg-card border border-border p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold mb-8 text-foreground">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary"
                    >
                      <option value="general">General Enquiry</option>
                      <option value="feedback">Product Feedback</option>
                      <option value="trade">Retail / Trade Partnership</option>
                      <option value="press">Press / Media</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary resize-none"
                  ></textarea>
                </div>

                <button type="submit" className="bg-primary text-primary-foreground px-8 py-4 rounded-md font-bold w-full hover:bg-primary/90 transition-colors notch-br">
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
