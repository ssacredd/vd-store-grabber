import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import visdabilLogo from "@/assets/visdabil-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VD Stores — Vision Enhance Roller | Clear, Soothed Eyes Naturally" },
      {
        name: "description",
        content:
          "Vision Enhance Roller — soothe dry, strained eyes naturally. 35% OFF today + Free Delivery + Pay on Delivery nationwide in Nigeria.",
      },
      { property: "og:title", content: "VD Stores — Vision Enhance Roller" },
      {
        property: "og:description",
        content:
          "Clear, soothed eyes without strain or expensive surgeries. Pay on delivery across Nigeria.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT (Abuja)","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara",
];

const PACKAGES = [
  { id: "A", name: "Package A: 1 Bottle", price: "₦20,000", regular: "₦40,000" },
  { id: "B", name: "Package B: 2 Bottles", price: "₦28,000", regular: "₦56,000", badge: "RECOMMENDED" },
  { id: "C", name: "Package C: 3 Bottles + 1 FREE", price: "₦44,000", regular: "₦88,000" },
  { id: "D", name: "Package D: 4 Bottles + 2 FREE", price: "₦61,000", regular: "₦122,000", badge: "MOST POPULAR", featured: true },
  { id: "E", name: "Package E: 5 Bottles + 3 FREE", price: "₦83,000", regular: "₦166,000" },
  { id: "F", name: "Package F: 6 Bottles + 4 FREE", price: "₦93,000", regular: "₦186,000" },
];

function Index() {
  const [selectedPkg, setSelectedPkg] = useState("");
  const [submitted, setSubmitted] = useState<null | { name: string; phone: string; pkg: string }>(null);

  const scrollToOrder = () => {
    document.getElementById("order-form-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const onPickPackage = (id: string) => {
    setSelectedPkg(id);
    scrollToOrder();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const pkgId = String(fd.get("package") || "");
    const pkgObj = PACKAGES.find((p) => p.id === pkgId);
    const payload = {
      timestamp: new Date().toISOString(),
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      address: String(fd.get("address") || ""),
      state: String(fd.get("state") || ""),
      payment: String(fd.get("payment") || ""),
      package: pkgObj?.name || pkgId,
      price: pkgObj?.price || "",
      page: typeof window !== "undefined" ? window.location.href : "",
    };

    // Google Apps Script Web App URL — paste your deployed /exec URL below
    const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyY4lPJCM3EnIpzw418apnnWYUE__BAlLEs4Ed85HaN5ZCOqgE_JI7fHZitpo0Fe-8/exec";
    if (WEBHOOK_URL) {
      fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }

    setSubmitted({ name: payload.name, phone: payload.phone, pkg: payload.package });
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };


  return (
    <div className="min-h-screen bg-[#f7faf7] text-slate-900">
      {/* Top promo bar */}
      <div className="bg-black text-white text-center text-sm sm:text-base font-semibold py-2 px-3">
        🔥 TODAY ONLY: 35% OFF + FREE DELIVERY = PAY ON DELIVERY
      </div>

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <img src={visdabilLogo.url} alt="Visdabil" className="h-12 w-auto object-contain" />
          <button
            onClick={scrollToOrder}
            className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase text-sm px-4 sm:px-5 py-2.5 rounded-md shadow"
          >
            Order Now
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
        <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-slate-900">
            Finally Get <span className="text-green-600">Clear, Soothed Eyes</span> Without Constant Strain or Expensive Surgeries
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Thousands of customers are already using Vision Enhance Roller to enjoy refreshed, comfortable eye wellness from the comfort of their homes.
          </p>
          <img src="/images/eye-vision-A.webp" alt="Vision Enhance Roller" className="mx-auto my-6 max-h-96 rounded-xl" />
          <ul className="text-left max-w-xl mx-auto space-y-2 text-slate-700">
            <li>✅ Deeply hydrates dry, itchy, and burning eyes instantly</li>
            <li>✅ Melts away heavy tension from phone and computer screens</li>
            <li>✅ Boosts natural micro-circulation around delicate eye tissues</li>
            <li>✅ 100% natural, chemical-free safe botanical formulation</li>
          </ul>
          <button
            onClick={scrollToOrder}
            className="mt-8 inline-block bg-red-600 hover:bg-red-700 text-white font-bold uppercase text-lg px-8 py-4 rounded-md shadow-lg"
          >
            Order Now
          </button>
          <p className="mt-3 text-sm text-slate-500">🔒 100% Secure Transaction & Free Delivery Included</p>
        </div>
      </section>

      {/* Problem */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center">Are You Tired Of...</h2>
        <img src="/images/glacouma.jpg" alt="Common eye problems" className="mx-auto my-6 rounded-xl max-h-80" />
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {[
            "Blurry vision and struggling to read small text or phone screen messages clearly.",
            "Painful, dry, sandy, or itchy sensations that force you to rub your eyes constantly.",
            "Severe headaches and throbbing pressure around your forehead after an hour of screen use.",
            "Fear of aging-related complications like cataracts, redness, or permanent cloudiness.",
          ].map((t) => (
            <div key={t} className="bg-white border rounded-lg p-4 flex gap-3">
              <span className="text-red-500 text-xl">❌</span>
              <p className="text-slate-700">{t}</p>
            </div>
          ))}
        </div>
        <p className="max-w-3xl mx-auto text-center mt-6 text-slate-600">
          Every day, thousands of people struggle with these exact issues and spend hard-earned money on expensive solutions that completely fail to deliver lasting results.
        </p>
      </section>

      {/* Introducing */}
      <section className="bg-white border-y">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <p className="uppercase tracking-widest text-sm text-slate-500">The Solution is Here</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold">Introducing...</h2>
          <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-green-600">VISION ENHANCE ROLLER</h3>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            The smarter, easier way to achieve bright, revitalized, and strain-free eyes naturally.
          </p>
          <img src="/images/elhoe-eye-vision.jpg" alt="Vision Enhance Roller close-up" className="mx-auto my-6 rounded-xl max-h-80" />
          <ul className="text-left max-w-xl mx-auto space-y-2 text-slate-700">
            <li>✓ Support and protect natural visual clarity levels</li>
            <li>✓ Instantly cool and alleviate daily screen fatigue</li>
            <li>✓ Soothe chronic dryness and restore structural hydration</li>
            <li>✓ Provide a localized therapeutic micro-massage action</li>
            <li>✓ Combat redness caused by dust, smog, and lack of sleep</li>
          </ul>
          <button
            onClick={scrollToOrder}
            className="mt-8 bg-green-600 hover:bg-green-700 text-white font-bold uppercase px-8 py-4 rounded-md shadow-lg"
          >
            Get Mine Now
          </button>
        </div>
      </section>

      {/* Recommended for */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-extrabold text-center">HIGHLY RECOMMENDED FOR:</h2>
        <p className="text-center text-slate-600 mt-3 max-w-3xl mx-auto">
          Our advanced botanical formula has been scientifically blended and proven to provide structural support, relief, and rapid comfort for individuals struggling with:
        </p>
        <img src="/images/eye-vision-F.jpg" alt="Conditions treated" className="mx-auto my-6 rounded-xl max-h-80" />
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {["Glaucoma","Cataracts","Blurry Vision","Itchy Eye","Reddish Eye","Watery Eye","Nearsightedness & Farsightedness","Dry Eye Syndrome","Eye Strain","Age-Related Macular Degeneration (AMD)","Light Sensitivity","Eye Allergies","Doubled Vision","Retinal Detachment","Floaters in the Eye","Presbyopia"].map((c) => (
            <span key={c} className="bg-green-50 border border-green-200 text-green-800 rounded-full px-3 py-1 text-sm">{c}</span>
          ))}
        </div>
      </section>

      {/* Why customers love it */}
      <section className="bg-white border-y">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-extrabold text-center">WHY CUSTOMERS LOVE IT</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {[
              { icon: "🌿", title: "100% Natural Formula", body: "Zero artificial compounds or dangerous chemicals. Safe for adults of all ages." },
              { icon: "❄️", title: "Instant Cooling Relief", body: "The custom steel ball targets micro-stress points around eye contours to instantly disperse irritation." },
              { icon: "📱", title: "Digital Defense", body: "Perfect for heavy phone users, remote workers, and laptop professionals facing high blue light output." },
              { icon: "👜", title: "Ultra-Portable Design", body: "Fits into pockets or daily handbags smoothly. Leak-proof design means comfort is always within arm's reach." },
              { icon: "⚡", title: "60-Second Application", body: "No complex or painful routines. Apply cleanly anytime, anywhere without any external assistance." },
              { icon: "❤️", title: "Gentle Skin Care", body: "Specially formulated to nourish and match the sensitive outer skin layers surrounding our eyes." },
            ].map((f) => (
              <div key={f.title} className="border rounded-xl p-5 bg-[#f7faf7]">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="font-bold mt-2">{f.title}</h3>
                <p className="text-slate-600 mt-1 text-sm">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-extrabold text-center">4 SIMPLE STEPS TO RELIEF</h2>
        <img src="/images/eye-vision-4.jpg" alt="How it works" className="mx-auto my-6 rounded-xl max-h-80" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { s: "STEP 01", t: "Cleanse Skin", b: "Wash and gently dry your face before application." },
            { s: "STEP 02", t: "Roll Lightly", b: "Glide the roller along structural eye socket contours." },
            { s: "STEP 03", t: "Soft Massage", b: "Allow the formula to absorb deeply via built-in steel tips." },
            { s: "STEP 04", t: "Daily Routines", b: "Repeat consistently twice a day for cumulative effects." },
          ].map((step) => (
            <div key={step.s} className="bg-white border rounded-xl p-5 text-center">
              <div className="text-orange-600 font-bold text-sm">{step.s}</div>
              <h3 className="font-bold mt-1">{step.t}</h3>
              <p className="text-slate-600 mt-2 text-sm">{step.b}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-6 text-slate-700 font-semibold">Simple. Fast. Effective.</p>
      </section>

      {/* Before/After */}
      <section className="bg-white border-y">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-extrabold text-center">REAL TRANSFORMATION</h2>
          <img src="/images/eye-vision-H.jpg" alt="Transformation" className="mx-auto my-6 rounded-xl max-h-80" />
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="border rounded-xl p-5 bg-red-50">
              <h3 className="font-bold text-red-700">BEFORE</h3>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li>❌ Constant frustration reading small text</li>
                <li>❌ Discomfort and painful burning eyes</li>
                <li>❌ Wasted money on drops that don't last</li>
                <li>❌ Poor daily lifestyle experience</li>
              </ul>
            </div>
            <div className="border rounded-xl p-5 bg-green-50">
              <h3 className="font-bold text-green-700">AFTER</h3>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li>✅ Better results and lasting lubrication</li>
                <li>✅ More confidence driving at night</li>
                <li>✅ Greater structural eye comfort</li>
                <li>✅ Vibrant and energetic lifestyle</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-extrabold text-center">LOVED BY REAL BUYERS</h2>
        <img src="/images/eye-vision-J.jpg" alt="Happy customers" className="mx-auto my-6 rounded-xl max-h-80" />
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { text: "I honestly wasn't expecting such great results. Within a short time of rolling it around my temples and eyes, I noticed a huge difference in my screen endurance. I work as an accountant and this is a lifesaver.", who: "Olumide O., Ikeja" },
            { text: "Exactly as described. Delivery to Kaduna was incredibly fast and the overall quality exceeded my expectations. No more regular morning itchiness or blurry vision when I wake up.", who: "Hadiza B., Kaduna" },
            { text: "Best purchase I've made this year. My age-related strain was making reading my bible difficult. Highly recommended to anyone over 45 who values their vision.", who: "Pa Emeka N., Port Harcourt" },
          ].map((r) => (
            <div key={r.who} className="bg-white border rounded-xl p-5">
              <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
              <p className="text-slate-700 mt-2 text-sm italic">"{r.text}"</p>
              <p className="mt-3 font-semibold text-slate-800 text-sm">— {r.who}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-10 text-center text-sm">
          {["🚚 Fast Delivery","🔒 Safe Ordering","💰 Pay On Delivery","📞 Full Support","↩️ 30-Day Guarantee"].map((t) => (
            <div key={t} className="bg-white border rounded-lg py-3 font-semibold text-slate-700">{t}</div>
          ))}
        </div>
      </section>

      {/* Low stock */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 text-center">
          <h3 className="text-xl font-extrabold text-yellow-800">⚠ LOW STOCK ALERT</h3>
          <p className="mt-2 font-semibold">Only 14 units remaining in current batch.</p>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            Due to high social media demand and limited import allocations, this offer may end at any time once current stock runs out. Secure yours now!
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-extrabold text-center">CHOOSE YOUR DISCOUNTED PACKAGE</h2>
        <p className="text-center text-slate-600 mt-2">🎁 Free Nationwide Delivery & Payment on Delivery apply to all orders</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {PACKAGES.map((p) => (
            <div
              key={p.id}
              className={`relative rounded-2xl p-6 border-2 bg-white flex flex-col ${
                p.featured ? "border-red-500 shadow-xl scale-[1.02]" : "border-slate-200"
              }`}
            >
              {p.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full text-white ${p.featured ? "bg-red-600" : "bg-green-600"}`}>
                  {p.badge}
                </span>
              )}
              <h3 className="font-extrabold text-lg text-slate-900">{p.name}</h3>
              {p.featured && (
                <p className="text-sm text-slate-600 mt-1">Best value for complete multi-generational family care plans.</p>
              )}
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-green-700">{p.price}</span>
                <span className="ml-2 text-slate-500 line-through">Regular {p.regular}</span>
              </div>
              {p.featured && (
                <ul className="mt-3 space-y-1 text-sm text-slate-700">
                  <li>✓ Free Delivery Nationwide</li>
                  <li>✓ Priority Express Processing</li>
                  <li>✓ Maximum Financial Savings Value</li>
                </ul>
              )}
              <button
                onClick={() => onPickPackage(p.id)}
                className="mt-5 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md"
              >
                Select This Package
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Guarantee */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white border-2 border-green-300 rounded-2xl p-8 text-center">
          <div className="text-5xl">🛡️</div>
          <h3 className="text-2xl font-extrabold mt-2">30-DAY SATISFACTION GUARANTEE</h3>
          <p className="text-slate-600 mt-3">
            Try it completely risk-free. If you're not satisfied with the soothing experience within 30 days, contact our dedicated support team via phone call or WhatsApp, and we'll assist you according to our simple return policy guidelines.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <h2 className="text-3xl font-extrabold text-center">FREQUENTLY ASKED QUESTIONS</h2>
        <div className="mt-6 space-y-3">
          {[
            { q: "How long does delivery take?", a: "Delivery takes 1-2 business days within Lagos and main urban cities, and 3-5 days for other regional locations." },
            { q: "Do I pay before delivery?", a: "No upfront financial commitment is required! We offer 100% Cash or Bank Transfer Payment on Delivery nationwide." },
            { q: "How do I use the Vision Enhance Roller?", a: "Simply roll the cool steel ball gently around the outer bones of your eye contours (orbital area) 2-3 times daily. Avoid rolling it directly inside your eye." },
            { q: "Is it safe for someone using glasses or eye drops?", a: "Yes, it is 100% natural and applied externally, making it completely safe. If you have had recent eye surgery, consult your doctor first." },
          ].map((f) => (
            <details key={f.q} className="bg-white border rounded-lg p-4">
              <summary className="font-bold cursor-pointer">Q: {f.q}</summary>
              <p className="text-slate-700 mt-2">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Order form */}
      <section id="order-form-section" className="bg-white border-t">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <p className="text-center text-sm text-slate-500 uppercase tracking-widest">Secure Order Placement</p>
          <h2 className="text-3xl font-extrabold text-center mt-1">FILL FORM TO ORDER NOW</h2>
          <p className="text-center text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-md p-3 mt-4 text-sm">
            ⚠️ Please fill only if you are fully ready to receive your package within 1 to 5 days.
          </p>

          {submitted ? (
            <div className="mt-8 bg-green-50 border-2 border-green-300 rounded-2xl p-8 text-center">
              <div className="text-5xl">🎉</div>
              <h3 className="text-2xl font-extrabold mt-2">Order Received Successfully!</h3>
              <p className="text-slate-600 mt-3">
                Thank you for your order! We are preparing your package. One of our support representatives will call or message you on WhatsApp shortly to confirm details.
              </p>
              <div className="mt-6 text-left bg-white border rounded-lg p-4 space-y-1">
                <p>📍 <strong>Name:</strong> {submitted.name}</p>
                <p>📞 <strong>Phone:</strong> {submitted.phone}</p>
                <p>📦 <strong>Package:</strong> {submitted.pkg}</p>
                <p>🚚 <strong>Delivery Style:</strong> Free Delivery - Pay On Delivery</p>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <Field label="Select Package *">
                <select
                  name="package"
                  required
                  value={selectedPkg}
                  onChange={(e) => setSelectedPkg(e.target.value)}
                  className="w-full border rounded-md px-3 py-3 bg-white"
                >
                  <option value="">-- Click to Select Package --</option>
                  {PACKAGES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.price})
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Your Full Name *">
                <input name="name" required className="w-full border rounded-md px-3 py-3" />
              </Field>

              <Field label="Phone Number *">
                <input name="phone" required type="tel" className="w-full border rounded-md px-3 py-3" />
              </Field>

              <Field label="Alternative Phone Number (Optional)">
                <input name="altPhone" type="tel" className="w-full border rounded-md px-3 py-3" />
              </Field>

              <Field label="Full Delivery Address *">
                <textarea name="address" required rows={3} className="w-full border rounded-md px-3 py-3" />
              </Field>

              <Field label="State of Delivery *">
                <select name="state" required className="w-full border rounded-md px-3 py-3 bg-white">
                  <option value="">-- Select State of Delivery --</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Preferred Payment Method <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <label className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 text-xs font-bold cursor-pointer hover:border-green-600 transition">
                    <span>💵 Cash on Delivery</span>
                    <input type="radio" name="payment" value="Cash on Delivery" defaultChecked className="accent-green-600" />
                  </label>
                  <label className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 text-xs font-bold cursor-pointer hover:border-green-600 transition">
                    <span>🏦 Transfer on Delivery</span>
                    <input type="radio" name="payment" value="Transfer on Delivery" className="accent-green-600" />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase py-4 rounded-xl text-lg shadow-lg tracking-wide"
              >
                👉 Submit Your Order Now
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="p-6 md:p-8 bg-gray-100 border-t border-gray-200 text-center text-xs text-slate-500 space-y-4">
        <p className="font-bold text-slate-700">VD Stores • Help Hotline: 09031591670</p>
        <p className="leading-relaxed">
          <strong>Disclaimer:</strong> This product is not intended to diagnose, treat, cure, or prevent any disease. The information provided on this site is for informational purposes only and is not intended as a substitute for advice from your physician or other health care professional. Always consult with a healthcare professional before starting any new routine.
        </p>
        <p className="leading-relaxed">
          Testimonials, case studies, and examples found on this page are results that have been forwarded to us by users of Vision Enhance Roller, and may not reflect the typical purchaser's experience.
        </p>
        <p className="leading-relaxed border-t border-gray-300 pt-4 text-[10px] text-slate-400">
          This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
        </p>
      </footer>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-semibold text-sm mb-1 text-slate-700">{label}</span>
      {children}
    </label>
  );
}
