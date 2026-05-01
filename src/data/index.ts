export const features = [
  { icon: "🔍", title: "Instant Plant Scan",  desc: "Point your camera at any herbal plant and get an AI-powered identification in seconds." },
  { icon: "📖", title: "Remedy Guide",         desc: "Filter by symptom to find safe herbal preparations, correct dosages, and usage tips." },
  { icon: "🕒", title: "Scan History",         desc: "Every plant you've scanned is saved. Revisit, compare, and build your own herb library." },
];

export const capabilities = [
  { num: "01", icon: "🌿", title: "Plant Identification",  tag: "Core",      desc: "AI-powered recognition of 10+ DOST-certified Filipino medicinal herbs with 95%+ accuracy from a single photo." },
  { num: "02", icon: "💊", title: "Symptom Matching",      tag: "Remedy",    desc: "Input your symptoms and instantly find which herbs address them — with preparation methods and safe dosage ranges." },
  { num: "03", icon: "🧪", title: "Safety Screening",      tag: "Safety",    desc: "Each herb recommendation is cross-checked against contraindications, drug interactions, and age-group suitability." },
  { num: "04", icon: "📚", title: "Cultural Context",      tag: "Heritage",  desc: "Learn the Filipino traditional use of each plant — its albularyo roots, regional names, and historical applications." },
  { num: "05", icon: "📍", title: "Harvest Locator",       tag: "Discovery", desc: "Find nearby locations where medicinal plants grow naturally or are sold at trusted herbolarios and pharmacies." },
  { num: "06", icon: "🔔", title: "Seasonal Alerts",       tag: "Smart",     desc: "Get notified when key herbs are in peak potency season so you always access the most effective preparations." },
];

export const steps = [
  {
    num: 1,
    title: "Open & Scan",
    desc: "Launch Hanap Medicina and point your camera at any leaf, plant, or bark. Our AI-powered scanner works in any lighting, no setup needed.",
  },
  {
    num: 2,
    title: "AI Analyzes",
    desc: "Our model cross-references a DOST-certified Filipino herbal database in seconds, identifying species and verifying safety with 95%+ accuracy.",
  },
  {
    num: 3,
    title: "Get Your Remedy",
    desc: "Read medicina uses, safe preparation methods, and dosage guides, including contraindications, cultural context, and regional names.",
  },
];

export const plants = [
  { name: "Tsaang Gubat", use: "Soothes abdominal pain",               img: "https://www.pchrd.dost.gov.ph/wp-content/uploads/2022/04/tsaanggubat2.jpg", tag: "Digestive" },
  { name: "Lagundi",      use: "Relieves cough & asthma",              img: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80",   tag: "Respiratory" },
  { name: "Sambong",      use: "Natural diuretic & anti-urolithiasis", img: "https://images.unsplash.com/photo-1587334274328-64186a80aeb3?w=600&q=80",   tag: "Kidney" },
];

export const footerLinks = {
  App:     ["Features", "Capabilities", "How it Works", "Plants", "Download"],
  Learn:   ["DOST Herbs", "Dosage Guide", "Safety Notes", "FAQ"],
  Company: ["About Us", "Blog", "Press", "Contact"],
  Legal:   ["Privacy Policy", "Terms of Use", "Licenses", "Cookies"],
};

export const NAV_LINKS = ["Home", "Features", "Capabilities", "How it Works", "Plants", "FAQ"];