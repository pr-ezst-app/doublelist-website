import { useState } from "react";
import Icon from "@/components/ui/icon";

type View = "home" | "browse" | "post-detail" | "create" | "profile" | "messages";

const CATEGORIES = [
  { icon: "Users", label: "Men seeking Women", slug: "m4w", count: 3241 },
  { icon: "Users", label: "Women seeking Men", slug: "w4m", count: 2189 },
  { icon: "Users", label: "Men seeking Men", slug: "m4m", count: 1876 },
  { icon: "Users", label: "Women seeking Women", slug: "w4w", count: 921 },
  { icon: "Heart", label: "Casual encounters", slug: "casual", count: 4102 },
  { icon: "Coffee", label: "Friendship & activity", slug: "friends", count: 742 },
  { icon: "Star", label: "Missed connections", slug: "missed", count: 389 },
  { icon: "Globe", label: "Strictly platonic", slug: "platonic", count: 618 },
];

const POSTS = [
  {
    id: 1,
    title: "Let's grab coffee and talk about anything",
    category: "Friendship & activity",
    slug: "friends",
    body: "30s guy here, new to the city and honestly just looking for good conversation. Love books, hiking, bad movies. No agenda — just tired of staring at my phone.",
    age: "28",
    location: "Brooklyn, NY",
    posted: "14 min ago",
    verified: true,
    replies: 4,
    views: 89,
  },
  {
    id: 2,
    title: "Saw you at the farmers market — red jacket",
    category: "Missed connections",
    slug: "missed",
    body: "You were buying flowers near the east entrance. We made eye contact twice. You smiled. I didn't say anything because I froze. Big regret. If this is you, please reach out.",
    age: "34",
    location: "Portland, OR",
    posted: "1h ago",
    verified: true,
    replies: 2,
    views: 214,
  },
  {
    id: 3,
    title: "Genuine connection, not just a swipe",
    category: "Men seeking Women",
    slug: "m4w",
    body: "Fed up with dating apps. Looking for someone to actually get to know. I'm 31, cook my own meals, have opinions about films. Long walks, late dinners, honest conversations.",
    age: "31",
    location: "Austin, TX",
    posted: "2h ago",
    verified: false,
    replies: 11,
    views: 342,
  },
  {
    id: 4,
    title: "Hiking partner wanted — serious only",
    category: "Friendship & activity",
    slug: "friends",
    body: "Looking for someone to tackle trails with on weekends. I'm intermediate level, have all gear. Not looking for anything romantic — just a reliable person who shows up.",
    age: "27",
    location: "Denver, CO",
    posted: "3h ago",
    verified: true,
    replies: 7,
    views: 156,
  },
  {
    id: 5,
    title: "Late night drive and good music",
    category: "Casual encounters",
    slug: "casual",
    body: "Sometimes you just need to roll the windows down and drive nowhere in particular. Looking for a co-pilot. I have a good playlist and bad sense of direction.",
    age: "25",
    location: "Los Angeles, CA",
    posted: "4h ago",
    verified: true,
    replies: 19,
    views: 498,
  },
  {
    id: 6,
    title: "Looking for my Sunday morning person",
    category: "Women seeking Men",
    slug: "w4m",
    body: "Someone to make breakfast with and do nothing in particular. Reading, music, farmers market maybe. I'm 29, creative type, emotionally available. Let's take it slow.",
    age: "29",
    location: "Chicago, IL",
    posted: "5h ago",
    verified: true,
    replies: 23,
    views: 601,
  },
  {
    id: 7,
    title: "Workout buddy — 5am club",
    category: "Strictly platonic",
    slug: "platonic",
    body: "I'm serious about early mornings and need someone to keep me accountable. Gym, runs, whatever. Must be consistent. Coffee after sometimes. That's it.",
    age: "33",
    location: "Seattle, WA",
    posted: "6h ago",
    verified: false,
    replies: 5,
    views: 88,
  },
  {
    id: 8,
    title: "She had a tattoo of a map and ordered black coffee",
    category: "Missed connections",
    slug: "missed",
    body: "Third Street Café, Tuesday around noon. You were reading something and I was pretending to work. I should have said hi. Here's hoping.",
    age: "36",
    location: "Nashville, TN",
    posted: "8h ago",
    verified: true,
    replies: 1,
    views: 302,
  },
];

const MESSAGES_DATA = [
  {
    id: 1,
    user: "Sarah",
    avatar: "S",
    verified: true,
    re: "Let's grab coffee...",
    last: "Still down for that! What neighborhood are you in?",
    time: "5 min",
    unread: true,
    thread: [
      { me: false, text: "Hey, saw your post. I'm new to Brooklyn too, would love to get coffee sometime." },
      { me: true, text: "That's great! Which part are you in?" },
      { me: false, text: "Still down for that! What neighborhood are you in?" },
    ],
  },
  {
    id: 2,
    user: "Anonymous",
    avatar: "?",
    verified: false,
    re: "Late night drive...",
    last: "I have a great playlist too. What music do you like?",
    time: "2h",
    unread: true,
    thread: [
      { me: false, text: "I have a great playlist too. What music do you like?" },
    ],
  },
  {
    id: 3,
    user: "Mike R.",
    avatar: "M",
    verified: true,
    re: "Hiking partner...",
    last: "Sounds perfect. I'm at Intermediate level too.",
    time: "1d",
    unread: false,
    thread: [
      { me: true, text: "Hey! Saw your hiking post — I'm in Denver too." },
      { me: false, text: "Sounds perfect. I'm at Intermediate level too." },
    ],
  },
];

function VerifiedBadge({ small = false }: { small?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full ${small ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-0.5"}`}>
      <Icon name="BadgeCheck" size={small ? 10 : 12} />
      Verified
    </span>
  );
}

function CategoryBadge({ label }: { label: string }) {
  const colors: Record<string, string> = {
    "Missed connections": "bg-rose-50 text-rose-700 border-rose-200",
    "Friendship & activity": "bg-sky-50 text-sky-700 border-sky-200",
    "Strictly platonic": "bg-violet-50 text-violet-700 border-violet-200",
    "Casual encounters": "bg-orange-50 text-orange-700 border-orange-200",
  };
  const cls = colors[label] ?? "bg-secondary text-muted-foreground border-border";
  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${cls}`}>
      {label}
    </span>
  );
}

function PostCard({ post, onClick }: { post: typeof POSTS[0]; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      className="group bg-card border border-border rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:border-stone-300 hover:shadow-sm animate-fade-in"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center flex-shrink-0 font-serif text-base text-foreground select-none">
          {post.age}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <CategoryBadge label={post.category} />
            {post.verified && <VerifiedBadge small />}
          </div>
          <h3 className="font-serif text-lg text-foreground leading-snug mb-2 group-hover:text-amber-700 transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
            {post.body}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Icon name="MapPin" size={11} />
              {post.location}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Clock" size={11} />
              {post.posted}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="MessageSquare" size={11} />
              {post.replies} {post.replies === 1 ? "reply" : "replies"}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Eye" size={11} />
              {post.views}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function NavBar({ view, setView }: { view: View; setView: (v: View) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const unread = MESSAGES_DATA.filter(m => m.unread).length;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => setView("home")}
          className="font-serif text-xl text-foreground tracking-tight hover:opacity-75 transition-opacity"
        >
          connect<span className="text-amber-500">.</span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { v: "home" as View, label: "Home" },
            { v: "browse" as View, label: "Browse" },
            { v: "messages" as View, label: "Messages", badge: unread },
            { v: "profile" as View, label: "My Posts" },
          ].map(({ v, label, badge }) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                view === v
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {label}
              {badge ? (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-foreground text-[10px] font-bold flex items-center justify-center">
                  {badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("create")}
            className="hidden md:flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-foreground font-semibold text-sm px-4 py-1.5 rounded-lg transition-all"
          >
            <Icon name="Pencil" size={14} />
            Post an ad
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
            { v: "profile" as View, label: "My Posts" },
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
            onClick={() => { setView("create"); setMenuOpen(false); }}
            className="mt-1 bg-amber-500 text-foreground font-semibold text-sm px-4 py-2 rounded-lg"
          >
            + Post an ad
          </button>
        </div>
      )}
    </header>
  );
}

function HomeView({ setView }: { setView: (v: View) => void }) {
  return (
    <div>
      <section className="bg-foreground noise-bg">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-xl animate-fade-in">
            <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-4">Real people. Real connections.</p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-5 text-white">
              Meet someone<br />worth <em className="text-amber-400 not-italic">meeting.</em>
            </h1>
            <p className="text-white/55 text-base mb-8 leading-relaxed">
              A clean, honest personal ads board. No algorithms. No swiping. Just write what you're looking for.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setView("browse")}
                className="bg-amber-500 hover:bg-amber-400 text-foreground font-semibold px-6 py-2.5 rounded-xl text-sm transition-all"
              >
                Browse ads
              </button>
              <button
                onClick={() => setView("create")}
                className="bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all border border-white/10"
              >
                Post for free
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-border bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4 py-4 flex gap-8 overflow-x-auto">
          {[
            { v: "13,400", l: "active posts today" },
            { v: "8,200+", l: "verified users" },
          ].map(s => (
            <div key={s.l} className="flex-shrink-0">
              <span className="font-serif text-xl text-foreground">{s.v}</span>
              <span className="text-xs text-muted-foreground ml-2">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="font-serif text-2xl text-foreground mb-5">Browse by section</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.slug}
              onClick={() => setView("browse")}
              className={`animate-fade-in stagger-${Math.min(i + 1, 6)} flex flex-col gap-1 p-4 bg-card border border-border rounded-xl hover:border-amber-300 hover:bg-amber-50/40 transition-all text-left group`}
            >
              <div className="font-medium text-sm text-foreground group-hover:text-amber-700 transition-colors leading-snug">
                {cat.label}
              </div>
              <div className="text-xs text-muted-foreground">{cat.count.toLocaleString()} posts</div>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-serif text-2xl text-foreground">Latest posts</h2>
          <button onClick={() => setView("browse")} className="text-sm text-amber-600 hover:text-amber-500 font-medium transition-colors">
            See all →
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {POSTS.slice(0, 5).map(post => (
            <PostCard key={post.id} post={post} onClick={() => setView("post-detail")} />
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="font-serif text-2xl text-foreground mb-8 text-center">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "01", title: "Write your post", desc: "No profile pic required. Just words. Say who you are and what you're looking for." },
              { n: "02", title: "Get verified", desc: "Email + phone verification keeps out bots and lets people know you're real." },
              { n: "03", title: "Connect privately", desc: "Replies go through our anonymous messaging system. Your info stays private until you choose otherwise." },
            ].map(step => (
              <div key={step.n} className="flex gap-4">
                <div className="font-serif text-3xl text-amber-400 leading-none flex-shrink-0">{step.n}</div>
                <div>
                  <div className="font-semibold text-sm text-foreground mb-1">{step.title}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-serif text-lg text-foreground">connect<span className="text-amber-500">.</span></span>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">About</a>
          </div>
          <span className="text-xs text-muted-foreground">© 2026 connect. 18+ only.</span>
        </div>
      </footer>
    </div>
  );
}

function BrowseView({ setView }: { setView: (v: View) => void }) {
  const [activeSlug, setActiveSlug] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = POSTS.filter(p =>
    (activeSlug === "all" || p.slug === activeSlug) &&
    (search === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.body.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-48 flex-shrink-0">
          <div className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3">Sections</div>
          <nav className="flex flex-col gap-0.5">
            <button
              onClick={() => setActiveSlug("all")}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                activeSlug === "all" ? "bg-foreground text-background font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              All posts
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setActiveSlug(cat.slug)}
                className={`text-left px-3 py-2 rounded-lg text-sm transition-all leading-snug ${
                  activeSlug === cat.slug ? "bg-foreground text-background font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {cat.label}
                <span className="block text-[10px] opacity-60">{cat.count.toLocaleString()}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="relative mb-5">
            <Icon name="Search" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-400 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">{filtered.length} posts</span>
            <button
              onClick={() => setView("create")}
              className="flex items-center gap-1.5 text-sm text-amber-600 hover:text-amber-500 font-medium transition-colors"
            >
              <Icon name="Pencil" size={13} />
              Post here
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Icon name="FileSearch" size={28} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No posts found.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map(post => (
                <PostCard key={post.id} post={post} onClick={() => setView("post-detail")} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function PostDetailView({ setView }: { setView: (v: View) => void }) {
  const post = POSTS[2];
  const [reply, setReply] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <button
        onClick={() => setView("browse")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <Icon name="ChevronLeft" size={16} />
        Back to browse
      </button>

      <article className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-4">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <CategoryBadge label={post.category} />
          {post.verified && <VerifiedBadge />}
        </div>

        <h1 className="font-serif text-3xl text-foreground mb-5 leading-snug">{post.title}</h1>

        <div className="flex items-center gap-2 mb-6 pb-6 border-b border-border">
          <div className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center font-serif text-base text-foreground">
            {post.age}
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">
              {post.age}yo · {post.location}
            </div>
            <div className="text-xs text-muted-foreground">{post.posted}</div>
          </div>
        </div>

        <p className="text-foreground leading-relaxed text-[15px]">{post.body}</p>

        <div className="flex items-center gap-5 mt-6 pt-5 border-t border-border text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Icon name="Eye" size={12} />{post.views} views</span>
          <span className="flex items-center gap-1.5"><Icon name="MessageSquare" size={12} />{post.replies} replies</span>
        </div>
      </article>

      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-xs text-amber-800">
        <Icon name="ShieldAlert" size={15} className="flex-shrink-0 mt-0.5" />
        <span>Replies are anonymous until you both agree to share contact info. Never send money or personal details upfront.</span>
      </div>

      {sent ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center animate-scale-in">
          <Icon name="CheckCircle2" size={28} className="mx-auto mb-2 text-emerald-600" />
          <div className="font-semibold text-sm text-foreground mb-1">Reply sent!</div>
          <div className="text-xs text-muted-foreground">The poster will see your message. Replies are anonymous until you both agree.</div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-serif text-lg text-foreground mb-4">Send a reply</h3>
          <textarea
            value={reply}
            onChange={e => setReply(e.target.value)}
            rows={4}
            placeholder="Introduce yourself honestly. What caught your attention about this post?"
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-400 text-foreground placeholder:text-muted-foreground resize-none mb-3"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Your identity stays private until you choose to share.</p>
            <button
              onClick={() => reply.trim() && setSent(true)}
              disabled={!reply.trim()}
              className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-foreground font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
            >
              Send reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CreateView({ setView }: { setView: (v: View) => void }) {
  const [step, setStep] = useState(1);
  const [selectedCat, setSelectedCat] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [published, setPublished] = useState(false);

  if (published) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle2" size={28} className="text-emerald-600" />
        </div>
        <h2 className="font-serif text-2xl text-foreground mb-2">Post is live!</h2>
        <p className="text-sm text-muted-foreground mb-6">Your ad is now visible. You'll be notified when someone replies.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => setView("browse")} className="bg-foreground text-background font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-foreground/90 transition-all">
            Browse all posts
          </button>
          <button onClick={() => { setPublished(false); setStep(1); setTitle(""); setBody(""); }} className="bg-secondary text-foreground font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-border transition-all">
            Post another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 animate-fade-in">
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step > s ? "bg-emerald-600 text-white" : step === s ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"
            }`}>
              {step > s ? <Icon name="Check" size={13} /> : s}
            </div>
            {s < 3 && <div className={`w-10 h-0.5 ${step > s ? "bg-emerald-600" : "bg-border"}`} />}
          </div>
        ))}
        <span className="ml-3 text-xs text-muted-foreground">
          {step === 1 && "Choose section"}
          {step === 2 && "Write your post"}
          {step === 3 && "Review & publish"}
        </span>
      </div>

      <h1 className="font-serif text-3xl text-foreground mb-6">
        {step === 1 && "Where does this belong?"}
        {step === 2 && "Write your post"}
        {step === 3 && "Looks good?"}
      </h1>

      {step === 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {CATEGORIES.map(cat => (
            <button
              key={cat.slug}
              onClick={() => { setSelectedCat(cat.label); setStep(2); }}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                selectedCat === cat.label
                  ? "border-amber-400 bg-amber-50"
                  : "border-border bg-card hover:border-amber-300 hover:bg-amber-50/30"
              }`}
            >
              <div>
                <div className="font-semibold text-sm text-foreground">{cat.label}</div>
                <div className="text-xs text-muted-foreground">{cat.count.toLocaleString()} active posts</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="bg-secondary/60 border border-border rounded-xl px-4 py-2 text-sm text-muted-foreground flex items-center gap-2">
            <Icon name="Tag" size={14} />
            Posting in: <span className="font-medium text-foreground">{selectedCat}</span>
            <button onClick={() => setStep(1)} className="ml-auto text-xs text-amber-600 hover:text-amber-500">Change</button>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Headline</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              type="text"
              placeholder="A short, honest headline..."
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-400 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Your post</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={6}
              placeholder="Be yourself. Describe who you are, what you're looking for, and what makes a great connection for you..."
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-400 text-foreground placeholder:text-muted-foreground resize-none"
            />
            <div className="text-xs text-muted-foreground mt-1.5 text-right">{body.length} / 2000</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Your age</label>
              <input
                value={age}
                onChange={e => setAge(e.target.value)}
                type="number"
                placeholder="18+"
                min={18}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-400 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Location</label>
              <div className="relative">
                <Icon name="MapPin" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  type="text"
                  placeholder="City, State"
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-card border border-border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-400 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => setStep(3)}
            disabled={!title.trim() || !body.trim() || !age || !location.trim()}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-foreground font-semibold py-3 rounded-xl transition-all text-sm"
          >
            Preview post →
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="bg-card border-2 border-amber-200 rounded-2xl p-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <CategoryBadge label={selectedCat} />
              <span className="text-xs text-muted-foreground">Preview</span>
            </div>
            <h3 className="font-serif text-xl text-foreground mb-3">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{body}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{age}yo</span>
              <span>·</span>
              <span>{location}</span>
              <span>·</span>
              <span>just now</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
              <Icon name="ShieldCheck" size={15} className="text-amber-500" />
              Before publishing
            </h3>
            <div className="space-y-2">
              {[
                { icon: "Mail", label: "Email verified", done: true },
                { icon: "Phone", label: "Phone verified", done: false },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-secondary/60 text-sm">
                  <div className="flex items-center gap-2.5">
                    <Icon name={item.icon} size={14} className="text-muted-foreground" />
                    <span className={item.done ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
                  </div>
                  {item.done
                    ? <span className="text-xs text-emerald-600 flex items-center gap-1"><Icon name="Check" size={11} /> Done</span>
                    : <button className="text-xs text-amber-600 font-medium hover:text-amber-500">Verify →</button>
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
              ← Edit
            </button>
            <button
              onClick={() => setPublished(true)}
              className="flex-1 bg-foreground hover:bg-foreground/90 text-background font-semibold py-3 rounded-xl text-sm transition-all"
            >
              Publish post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MessagesView() {
  const [active, setActive] = useState<number | null>(1);
  const [reply, setReply] = useState("");
  const activeThread = MESSAGES_DATA.find(m => m.id === active);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="font-serif text-3xl text-foreground mb-6">Messages</h1>
      <div className="grid md:grid-cols-5 gap-4" style={{ height: 520 }}>
        <div className="md:col-span-2 flex flex-col gap-2 overflow-y-auto">
          {MESSAGES_DATA.map(msg => (
            <button
              key={msg.id}
              onClick={() => setActive(msg.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                active === msg.id
                  ? "bg-foreground border-foreground"
                  : "bg-card border-border hover:border-amber-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-serif text-base flex-shrink-0 ${
                  active === msg.id ? "bg-white/15 text-white" : "bg-secondary border border-border text-foreground"
                }`}>
                  {msg.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className={`font-semibold text-sm flex items-center gap-1 ${active === msg.id ? "text-white" : "text-foreground"}`}>
                      {msg.user}
                      {msg.verified && <Icon name="BadgeCheck" size={11} className={active === msg.id ? "text-emerald-300" : "text-emerald-500"} />}
                    </span>
                    <span className={`text-xs ${active === msg.id ? "text-white/50" : "text-muted-foreground"}`}>{msg.time}</span>
                  </div>
                  <div className={`text-xs truncate ${active === msg.id ? "text-white/60" : "text-muted-foreground"}`}>
                    Re: {msg.re}
                  </div>
                  {msg.unread && active !== msg.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {activeThread ? (
          <div className="md:col-span-3 bg-card border border-border rounded-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="font-semibold text-sm text-foreground">{activeThread.user}</div>
              <div className="text-xs text-muted-foreground">Re: {activeThread.re}</div>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {activeThread.thread.map((msg, i) => (
                <div key={i} className={`flex ${msg.me ? "justify-end" : "justify-start"}`}>
                  <div className={`text-sm px-4 py-2.5 rounded-2xl max-w-xs leading-relaxed ${
                    msg.me
                      ? "bg-foreground text-background rounded-tr-sm"
                      : "bg-secondary text-foreground rounded-tl-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={reply}
                onChange={e => setReply(e.target.value)}
                onKeyDown={e => e.key === "Enter" && setReply("")}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-amber-400 text-foreground placeholder:text-muted-foreground"
              />
              <button
                onClick={() => setReply("")}
                className="bg-amber-500 hover:bg-amber-400 text-foreground px-4 py-2.5 rounded-xl transition-all"
              >
                <Icon name="Send" size={15} />
              </button>
            </div>
          </div>
        ) : (
          <div className="md:col-span-3 bg-card border border-border rounded-2xl flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon name="MessageSquare" size={28} className="mx-auto mb-2 opacity-25" />
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
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <div className="bg-card border border-border rounded-2xl p-6 text-center mb-4">
            <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center font-serif text-2xl mx-auto mb-3">31</div>
            <div className="font-semibold text-foreground mb-1">Alex (31)</div>
            <div className="text-xs text-muted-foreground mb-3">Brooklyn, NY · Member 8 months</div>
            <div className="flex justify-center mb-4">
              <VerifiedBadge />
            </div>
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border text-xs">
              {[["3", "posts"], ["14", "replies"]].map(([v, l]) => (
                <div key={l} className="text-center">
                  <div className="font-serif text-xl text-foreground">{v}</div>
                  <div className="text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Verification</h3>
            {[
              { l: "Email", done: true },
              { l: "Phone", done: true },
              { l: "ID", done: false },
            ].map(item => (
              <div key={item.l} className="flex items-center justify-between py-1.5 text-sm">
                <span className={item.done ? "text-foreground" : "text-muted-foreground"}>{item.l}</span>
                {item.done
                  ? <span className="text-xs text-emerald-600 flex items-center gap-1"><Icon name="Check" size={11} /> Done</span>
                  : <button className="text-xs text-amber-600 font-medium">Verify →</button>
                }
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-2xl text-foreground">My posts</h2>
            <button
              onClick={() => setView("create")}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-foreground font-semibold text-sm px-4 py-2 rounded-xl transition-all"
            >
              <Icon name="Pencil" size={13} />
              New post
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {POSTS.slice(0, 3).map(post => (
              <PostCard key={post.id} post={post} onClick={() => setView("post-detail")} />
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
      {view === "post-detail" && <PostDetailView setView={setView} />}
      {view === "create" && <CreateView setView={setView} />}
      {view === "messages" && <MessagesView />}
      {view === "profile" && <ProfileView setView={setView} />}
    </div>
  );
}