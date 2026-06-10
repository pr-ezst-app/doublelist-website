import { useState } from "react";
import Icon from "@/components/ui/icon";

type View = "home" | "browse" | "listing" | "post" | "profile" | "messages";

const CATEGORIES = [
  { icon: "Home", label: "Housing", count: 1284 },
  { icon: "Car", label: "Vehicles", count: 892 },
  { icon: "Briefcase", label: "Jobs", count: 543 },
  { icon: "Laptop", label: "Electronics", count: 2103 },
  { icon: "Shirt", label: "Clothing", count: 741 },
  { icon: "Sofa", label: "Furniture", count: 618 },
  { icon: "Heart", label: "Pets", count: 329 },
  { icon: "Wrench", label: "Services", count: 456 },
];

const SAMPLE_LISTINGS = [
  {
    id: 1,
    title: "Spacious 2BR apartment, natural light",
    category: "Housing",
    price: "$1,850/mo",
    location: "Brooklyn, NY",
    age: "2h ago",
    verified: true,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80",
    description: "Beautiful apartment with hardwood floors, updated kitchen, in-unit laundry. No broker fee.",
  },
  {
    id: 2,
    title: "2019 Honda Civic — clean title, low miles",
    category: "Vehicles",
    price: "$14,500",
    location: "Austin, TX",
    age: "5h ago",
    verified: true,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80",
    description: "One owner, all service records, new tires. Will consider reasonable offers.",
  },
  {
    id: 3,
    title: "MacBook Pro 14\" M3 — like new",
    category: "Electronics",
    price: "$1,600",
    location: "San Francisco, CA",
    age: "1d ago",
    verified: false,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
    description: "Purchased 4 months ago. Selling because I upgraded. Comes with original box and charger.",
  },
  {
    id: 4,
    title: "Mid-century modern sofa — walnut legs",
    category: "Furniture",
    price: "$480",
    location: "Chicago, IL",
    age: "2d ago",
    verified: true,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    description: "Great condition. Moving across the country — must sell this weekend.",
  },
  {
    id: 5,
    title: "Senior React developer — remote",
    category: "Jobs",
    price: "$95k–$130k",
    location: "Remote",
    age: "3h ago",
    verified: true,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
    description: "Series B startup, strong eng culture, flexible hours. Full benefits + equity.",
  },
  {
    id: 6,
    title: "Golden Retriever puppies — 8 weeks",
    category: "Pets",
    price: "$800",
    location: "Denver, CO",
    age: "6h ago",
    verified: true,
    image: "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=400&q=80",
    description: "AKC registered, vet checked, first shots done. Parents on site.",
  },
];

const MESSAGES = [
  {
    id: 1,
    user: "Alex M.",
    avatar: "A",
    verified: true,
    listing: "2019 Honda Civic",
    last: "Is it still available? I can come by tomorrow.",
    time: "10 min",
    unread: true,
  },
  {
    id: 2,
    user: "Jordan K.",
    avatar: "J",
    verified: false,
    listing: "MacBook Pro 14\"",
    last: "Would you take $1,400?",
    time: "2h",
    unread: true,
  },
  {
    id: 3,
    user: "Sam R.",
    avatar: "S",
    verified: true,
    listing: "Mid-century sofa",
    last: "Perfect, I'll take it. What time works for pickup?",
    time: "1d",
    unread: false,
  },
];

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
      <Icon name="BadgeCheck" size={12} />
      Verified
    </span>
  );
}

function ListingCard({ listing, onClick }: { listing: typeof SAMPLE_LISTINGS[0]; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-card rounded-xl border border-border overflow-hidden cursor-pointer hover-lift animate-fade-in group"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-medium bg-white/90 backdrop-blur-sm text-foreground px-2.5 py-1 rounded-full border border-border/50">
            {listing.category}
          </span>
        </div>
        {listing.verified && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full border border-emerald-200">
              <Icon name="BadgeCheck" size={11} />
              Verified
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-sans font-semibold text-sm leading-snug text-foreground line-clamp-2 flex-1">
            {listing.title}
          </h3>
          <span className="font-sans font-bold text-sm text-foreground whitespace-nowrap">
            {listing.price}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-2 text-muted-foreground">
          <span className="flex items-center gap-1 text-xs">
            <Icon name="MapPin" size={11} />
            {listing.location}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <Icon name="Clock" size={11} />
            {listing.age}
          </span>
        </div>
      </div>
    </div>
  );
}

function NavBar({ view, setView }: { view: View; setView: (v: View) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => setView("home")}
          className="font-serif text-xl text-foreground tracking-tight hover:opacity-80 transition-opacity"
        >
          List<span className="text-amber-500">Up</span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { v: "home" as View, label: "Home" },
            { v: "browse" as View, label: "Browse" },
            { v: "messages" as View, label: "Messages" },
            { v: "profile" as View, label: "My Profile" },
          ].map(({ v, label }) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                view === v
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("post")}
            className="hidden md:flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-foreground font-semibold text-sm px-4 py-1.5 rounded-lg transition-all"
          >
            <Icon name="Plus" size={15} />
            Post Listing
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in px-4 py-3 flex flex-col gap-1">
          {[
            { v: "home" as View, label: "Home" },
            { v: "browse" as View, label: "Browse" },
            { v: "messages" as View, label: "Messages" },
            { v: "profile" as View, label: "My Profile" },
          ].map(({ v, label }) => (
            <button
              key={v}
              onClick={() => { setView(v); setMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => { setView("post"); setMenuOpen(false); }}
            className="mt-1 bg-amber-500 text-foreground font-semibold text-sm px-4 py-2 rounded-lg"
          >
            + Post Listing
          </button>
        </div>
      )}
    </header>
  );
}

function HomeView({ setView }: { setView: (v: View) => void }) {
  const [search, setSearch] = useState("");

  return (
    <div>
      <section className="relative overflow-hidden bg-foreground text-background noise-bg">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-6 border border-white/10">
              <Icon name="ShieldCheck" size={13} />
              Spam-free. Scam-free. No dark patterns.
            </div>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-4 text-white">
              Classifieds done<br />
              <em className="text-amber-400 not-italic">the right way.</em>
            </h1>
            <p className="text-white/60 text-lg mb-8 font-light">
              Real listings. Verified people. Zero clutter.
            </p>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search listings..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-foreground placeholder:text-muted-foreground text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-400"
                  onKeyDown={e => e.key === "Enter" && setView("browse")}
                />
              </div>
              <button
                onClick={() => setView("browse")}
                className="bg-amber-500 hover:bg-amber-400 text-foreground font-semibold px-5 py-3 rounded-xl text-sm transition-all"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      <section className="border-b border-border bg-secondary/40">
        <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-3 gap-4">
          {[
            { value: "24,800+", label: "Active listings" },
            { value: "98%", label: "Spam-free rate" },
            { value: "12,400+", label: "Verified users" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-serif text-2xl md:text-3xl text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-serif text-2xl text-foreground">Browse by category</h2>
          <button onClick={() => setView("browse")} className="text-sm text-amber-600 hover:text-amber-500 font-medium transition-colors">
            See all →
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setView("browse")}
              className={`animate-fade-in stagger-${Math.min(i + 1, 6)} group flex flex-col items-start gap-3 p-4 bg-card border border-border rounded-xl hover:border-amber-300 hover:bg-amber-50/50 transition-all text-left`}
            >
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                <Icon name={cat.icon} size={18} className="text-foreground" />
              </div>
              <div>
                <div className="font-semibold text-sm text-foreground">{cat.label}</div>
                <div className="text-xs text-muted-foreground">{cat.count.toLocaleString()} listings</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-serif text-2xl text-foreground">Recent listings</h2>
          <button onClick={() => setView("browse")} className="text-sm text-amber-600 hover:text-amber-500 font-medium transition-colors">
            View all →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SAMPLE_LISTINGS.slice(0, 6).map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onClick={() => setView("listing")}
            />
          ))}
        </div>
      </section>

      <section className="bg-foreground text-background noise-bg">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
          {[
            { icon: "ShieldCheck", title: "User verification", desc: "ID verification and phone confirmation to ensure every user is real." },
            { icon: "Lock", title: "Secure messaging", desc: "End-to-end encrypted chats. Your contact info stays private." },
            { icon: "AlertTriangle", title: "Report & protect", desc: "One-tap reporting. Suspicious listings are reviewed within 2 hours." },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} size={18} className="text-amber-400" />
              </div>
              <div>
                <div className="font-semibold text-white text-sm mb-1">{item.title}</div>
                <div className="text-white/50 text-sm font-light leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-serif text-lg text-foreground">
            List<span className="text-amber-500">Up</span>
          </span>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Safety</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
          <span className="text-xs text-muted-foreground">© 2026 ListUp. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

function BrowseView({ setView }: { setView: (v: View) => void }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const allCategories = ["All", ...CATEGORIES.map(c => c.label)];
  const filtered = SAMPLE_LISTINGS.filter(l =>
    (activeCategory === "All" || l.category === activeCategory) &&
    (searchQuery === "" || l.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search listings..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-400 text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-card border border-border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-400 text-foreground min-w-[140px]"
        >
          <option value="newest">Newest first</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
              activeCategory === cat
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-border hover:border-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">{filtered.length} listings found</span>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg border border-border bg-foreground text-background">
            <Icon name="LayoutGrid" size={15} />
          </button>
          <button className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Icon name="List" size={15} />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Icon name="SearchX" size={32} className="mx-auto mb-3 opacity-40" />
          <p className="font-sans">No listings match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(listing => (
            <ListingCard key={listing.id} listing={listing} onClick={() => setView("listing")} />
          ))}
        </div>
      )}
    </div>
  );
}

function ListingDetailView({ setView }: { setView: (v: View) => void }) {
  const listing = SAMPLE_LISTINGS[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <button
        onClick={() => setView("browse")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <Icon name="ChevronLeft" size={16} />
        Back to listings
      </button>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <div className="rounded-2xl overflow-hidden border border-border mb-4">
            <img src={listing.image} alt={listing.title} className="w-full h-72 object-cover" />
          </div>
          <div className="flex gap-2 mb-6">
            {[listing.image, listing.image, listing.image].map((img, i) => (
              <div key={i} className="w-20 h-14 rounded-lg overflow-hidden border-2 border-transparent hover:border-amber-400 cursor-pointer transition-all">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium bg-secondary text-muted-foreground px-2.5 py-1 rounded-full">
              {listing.category}
            </span>
            {listing.verified && <VerifiedBadge />}
            <span className="text-xs text-muted-foreground">{listing.age}</span>
          </div>
          <h1 className="font-serif text-3xl text-foreground mb-2">{listing.title}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1"><Icon name="MapPin" size={13} />{listing.location}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm">{listing.description}</p>

          <div className="mt-6 p-4 bg-secondary/60 rounded-xl border border-border">
            <h3 className="font-semibold text-sm mb-3 text-foreground">Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[["Category", listing.category], ["Location", listing.location], ["Posted", listing.age], ["Condition", "Good"]].map(([k, v]) => (
                <div key={k}>
                  <span className="text-muted-foreground">{k}</span>
                  <div className="font-medium text-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="sticky top-20">
            <div className="bg-card border border-border rounded-2xl p-5 mb-4">
              <div className="text-3xl font-serif text-foreground mb-4">{listing.price}</div>
              <button className="w-full bg-amber-500 hover:bg-amber-400 text-foreground font-semibold py-3 rounded-xl mb-2 transition-all text-sm">
                Contact seller
              </button>
              <button
                onClick={() => setView("messages")}
                className="w-full bg-secondary hover:bg-border text-foreground font-semibold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
              >
                <Icon name="MessageCircle" size={16} />
                Send message
              </button>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-serif text-lg">
                  J
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">James Wilson</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <VerifiedBadge />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground pt-3 border-t border-border">
                <span><strong className="text-foreground">24</strong> listings</span>
                <span><strong className="text-foreground">4.9★</strong> rating</span>
                <span><strong className="text-foreground">2yr</strong> member</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800">
              <div className="flex items-start gap-2">
                <Icon name="ShieldAlert" size={15} className="flex-shrink-0 mt-0.5" />
                <span>Always meet in a public place. Never send payment before inspecting items.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostListingView({ setView }: { setView: (v: View) => void }) {
  const [category, setCategory] = useState("");
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= s ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"
              }`}>
                {step > s ? <Icon name="Check" size={13} /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-foreground" : "bg-border"}`} />}
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          {step === 1 && "Choose a category"}
          {step === 2 && "Add listing details"}
          {step === 3 && "Verify & publish"}
        </div>
      </div>

      <h1 className="font-serif text-3xl text-foreground mb-6">
        {step === 1 && "What are you listing?"}
        {step === 2 && "Describe your listing"}
        {step === 3 && "Review & publish"}
      </h1>

      {step === 1 && (
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.label}
              onClick={() => { setCategory(cat.label); setStep(2); }}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                category === cat.label
                  ? "border-amber-400 bg-amber-50"
                  : "border-border bg-card hover:border-amber-300 hover:bg-amber-50/30"
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <Icon name={cat.icon} size={16} />
              </div>
              <div>
                <div className="font-semibold text-sm text-foreground">{cat.label}</div>
                <div className="text-xs text-muted-foreground">{cat.count} listings</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Title</label>
            <input
              type="text"
              placeholder="Be specific and descriptive..."
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-400 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Price</label>
            <input
              type="text"
              placeholder="$ 0.00"
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-400 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Location</label>
            <div className="relative">
              <Icon name="MapPin" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="City, State"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-400 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Description</label>
            <textarea
              rows={4}
              placeholder="Describe your item — condition, dimensions, history..."
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-400 text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Photos</label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center text-muted-foreground hover:border-amber-400 transition-colors cursor-pointer">
              <Icon name="ImagePlus" size={24} className="mx-auto mb-2 opacity-60" />
              <div className="text-sm">Click to upload photos</div>
              <div className="text-xs mt-1 opacity-60">Up to 12 photos, JPG or PNG</div>
            </div>
          </div>
          <button
            onClick={() => setStep(3)}
            className="w-full bg-amber-500 hover:bg-amber-400 text-foreground font-semibold py-3 rounded-xl transition-all text-sm"
          >
            Continue →
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold text-sm text-foreground mb-3">Verify your identity</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Verified listings get 3× more responses and build trust with buyers.
            </p>
            <div className="space-y-2">
              {[
                { icon: "Phone", label: "Phone verification", done: false },
                { icon: "Mail", label: "Email verification", done: true },
                { icon: "CreditCard", label: "ID verification", done: false },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-secondary/60">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Icon name={item.icon} size={15} className="text-muted-foreground" />
                    <span className={item.done ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
                  </div>
                  {item.done
                    ? <span className="text-xs text-emerald-600 flex items-center gap-1"><Icon name="Check" size={12} /> Done</span>
                    : <button className="text-xs text-amber-600 font-medium hover:text-amber-500 transition-colors">Verify →</button>
                  }
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex-1 bg-secondary hover:bg-border text-foreground font-semibold py-3 rounded-xl text-sm transition-all"
            >
              ← Back
            </button>
            <button
              onClick={() => setView("browse")}
              className="flex-1 bg-foreground hover:bg-foreground/90 text-background font-semibold py-3 rounded-xl text-sm transition-all"
            >
              Publish listing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MessagesView() {
  const [activeThread, setActiveThread] = useState<number | null>(1);
  const [reply, setReply] = useState("");

  const active = MESSAGES.find(m => m.id === activeThread);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-serif text-3xl text-foreground mb-6">Messages</h1>
      <div className="grid md:grid-cols-5 gap-4 h-[500px]">
        <div className="md:col-span-2 space-y-2 overflow-y-auto">
          {MESSAGES.map(msg => (
            <button
              key={msg.id}
              onClick={() => setActiveThread(msg.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                activeThread === msg.id
                  ? "bg-foreground border-foreground text-background"
                  : "bg-card border-border hover:border-amber-300 hover:bg-amber-50/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-serif font-bold text-sm flex-shrink-0 ${
                  activeThread === msg.id ? "bg-white/20 text-white" : "bg-foreground text-background"
                }`}>
                  {msg.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`font-semibold text-sm ${activeThread === msg.id ? "text-white" : "text-foreground"}`}>
                      {msg.user}
                    </span>
                    <span className={`text-xs ${activeThread === msg.id ? "text-white/60" : "text-muted-foreground"}`}>
                      {msg.time}
                    </span>
                  </div>
                  <div className={`text-xs truncate ${activeThread === msg.id ? "text-white/70" : "text-muted-foreground"}`}>
                    {msg.last}
                  </div>
                  {msg.unread && activeThread !== msg.id && (
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {active ? (
          <div className="md:col-span-3 bg-card border border-border rounded-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-serif font-bold text-sm">
                {active.avatar}
              </div>
              <div>
                <div className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                  {active.user}
                  {active.verified && <Icon name="BadgeCheck" size={13} className="text-emerald-500" />}
                </div>
                <div className="text-xs text-muted-foreground">Re: {active.listing}</div>
              </div>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              <div className="flex justify-end">
                <div className="bg-foreground text-background text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-xs">
                  Hi! Is this still available?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-secondary text-foreground text-sm px-4 py-2.5 rounded-2xl rounded-tl-sm max-w-xs">
                  {active.last}
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <input
                type="text"
                value={reply}
                onChange={e => setReply(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-400 text-foreground placeholder:text-muted-foreground"
              />
              <button className="bg-amber-500 hover:bg-amber-400 text-foreground px-4 py-2.5 rounded-xl transition-all">
                <Icon name="Send" size={15} />
              </button>
            </div>
          </div>
        ) : (
          <div className="md:col-span-3 bg-card border border-border rounded-2xl flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon name="MessageCircle" size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">Select a conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileView({ setView }: { setView: (v: View) => void }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-card border border-border rounded-2xl p-6 text-center mb-4">
            <div className="w-20 h-20 rounded-full bg-foreground text-background flex items-center justify-center font-serif text-3xl mx-auto mb-3">
              J
            </div>
            <h2 className="font-serif text-xl text-foreground mb-1">James Wilson</h2>
            <div className="flex justify-center mb-3">
              <VerifiedBadge />
            </div>
            <div className="text-xs text-muted-foreground mb-4">Member since Jan 2024</div>
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
              {[["24", "Listings"], ["4.9", "Rating"], ["98%", "Response"]].map(([v, l]) => (
                <div key={l}>
                  <div className="font-serif text-lg text-foreground">{v}</div>
                  <div className="text-xs text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4 space-y-2">
            <h3 className="font-semibold text-sm text-foreground mb-2">Verification</h3>
            {[
              { label: "Email", done: true },
              { label: "Phone", done: true },
              { label: "Government ID", done: false },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className={item.done ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
                {item.done
                  ? <span className="text-emerald-600 flex items-center gap-1 text-xs"><Icon name="CheckCircle2" size={13} /> Verified</span>
                  : <button className="text-amber-600 text-xs font-medium hover:text-amber-500 transition-colors">Verify →</button>
                }
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-2xl text-foreground">My listings</h2>
            <button
              onClick={() => setView("post")}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-foreground font-semibold text-sm px-4 py-2 rounded-xl transition-all"
            >
              <Icon name="Plus" size={14} />
              New listing
            </button>
          </div>

          <div className="space-y-3">
            {SAMPLE_LISTINGS.slice(0, 3).map(listing => (
              <div
                key={listing.id}
                className="flex gap-4 bg-card border border-border rounded-xl p-4 hover-lift cursor-pointer"
                onClick={() => setView("listing")}
              >
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm text-foreground truncate">{listing.title}</h3>
                    <span className="font-bold text-sm text-foreground whitespace-nowrap">{listing.price}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span>{listing.location}</span>
                    <span>{listing.age}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">Active</span>
                    {listing.verified && <VerifiedBadge />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [view, setView] = useState<View>("home");

  return (
    <div className="min-h-screen bg-background font-sans">
      <NavBar view={view} setView={setView} />
      {view === "home" && <HomeView setView={setView} />}
      {view === "browse" && <BrowseView setView={setView} />}
      {view === "listing" && <ListingDetailView setView={setView} />}
      {view === "post" && <PostListingView setView={setView} />}
      {view === "messages" && <MessagesView />}
      {view === "profile" && <ProfileView setView={setView} />}
    </div>
  );
}
