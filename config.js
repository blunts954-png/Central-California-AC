/**
 * MASTER BUSINESS CONFIGURATION
 * Pivot this file to change the entire site's identity instantly.
 */
const CONFIG = {
  // Brand Identity
  brand: {
    name: "Central California Air", // Change to "Expert Plumbing", etc.
    industry: "HVAC",              // Used for context
    logoUrl: "ccaclogo.png",       // Leave blank "" to hide
    assetUrl: "ccactruck.png",     // Featured hero image (Truck, van, tool, etc.)
  },

  // Contact & Logistics
  contact: {
    phone: "661-577-5018",
    email: "service@centralca-air.com",
    locations: ["Bakersfield", "Oildale", "Shafter", "Tehachapi"],
    region: "Kern County",
  },

  // Business Rules (Used by AI & UI)
  rules: {
    diagnosticFee: "$89",           // "Diagnostic fee is $100"
    waiveCondition: "waived if repair is approved",
    emergencyThreshold: "above 90 degrees or system failure",
  },

  // Service Offerings
  services: [
    {
      title: "Emergency Repair",
      desc: "Rapid response when your systems fail during critical temperatures.",
      icon: "zap"
    },
    {
      title: "Preventive Maintenance",
      desc: "Seasonal check-ups to extend equipment life and lower energy bills.",
      icon: "shield"
    },
    {
      title: "New Installations",
      desc: "Free estimates on high-efficiency, modern equipment upgrades.",
      icon: "home"
    }
  ],

  // AI Dispatcher Customization
  ai: {
    dispatcherName: "Lead Dispatcher",
    language: "Bilingual (English/Spanish)",
    greeting: "Welcome. How can we help? | Bienvenido. ¿Cómo podemos ayudarle?",
    role: "Intake & Emergency Routing"
  }
};

// Export if used in Node, else it sits on window
if (typeof module !== 'undefined') {
  module.exports = CONFIG;
}
