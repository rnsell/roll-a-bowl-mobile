import { useState } from "react";

const theme = {
  bg: "#F5EDE4",
  bgDeep: "#EDE3D8",
  card: "#FFFCF8",
  accent: "#8B5E3C",
  accentLight: "#C9A882",
  accentLighter: "#E8D8C4",
  accentDark: "#5C3D28",
  text: "#3B2A1A",
  textMuted: "#907A68",
  textLight: "#B8A594",
  border: "#E0D5C8",
  green: "#6B8F5E",
  greenLight: "#E4EDDF",
  greenDark: "#4A6B3E",
  red: "#C0574B",
  redLight: "#F3DDD9",
  yellow: "#D4A843",
  yellowLight: "#F8EFDA",
  white: "#FFFCF8",
};

const font = `'Newsreader', 'Georgia', serif`;
const sans = `'DM Sans', 'Helvetica Neue', sans-serif`;

const Icons = {
  Recipe: ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? theme.accent : theme.textLight} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2z" fill={active ? theme.accentLighter : "none"} />
      <path d="M8 7h8M8 11h6M8 15h4" />
    </svg>
  ),
  MealPlan: ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? theme.accent : theme.textLight} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" fill={active ? theme.accentLighter : "none"} />
      <path d="M3 10h18M16 2v4M8 2v4" />
      <circle cx="8" cy="15" r="1.5" fill={active ? theme.accent : theme.textLight} stroke="none" />
      <circle cx="12" cy="15" r="1.5" fill={active ? theme.accent : theme.textLight} stroke="none" />
    </svg>
  ),
  Grocery: ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? theme.accent : theme.textLight} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" fill={active ? theme.accentLighter : "none"} />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  Settings: ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? theme.accent : theme.textLight} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" fill={active ? theme.accentLighter : "none"} />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>,
  Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  Clock: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  Star: () => <svg width="12" height="12" viewBox="0 0 24 24" fill={theme.yellow} stroke={theme.yellow} strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Check: ({ checked }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="6" fill={checked ? theme.green : "none"} stroke={checked ? theme.green : theme.border} strokeWidth="2"/>
      {checked && <path d="M7 12l3 3 7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>}
    </svg>
  ),
  Chevron: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.textLight} strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>,
  Heart: ({ filled }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? theme.red : "none"} stroke={filled ? theme.red : theme.textLight} strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  ArrowLeft: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>,
  ArrowRight: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>,
};

const RecipeThumb = ({ colors, emoji, size = 80, radius = 14 }) => (
  <div style={{
    width: size, height: size, borderRadius: radius, flexShrink: 0,
    background: `linear-gradient(145deg, ${colors[0]}, ${colors[1]})`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.38, position: "relative", overflow: "hidden",
    boxShadow: `0 2px 8px ${colors[0]}33`,
  }}>
    <span style={{ position: "relative", zIndex: 1 }}>{emoji}</span>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.25), transparent 60%)" }} />
  </div>
);

const recipes = [
  { name: "Spicy Peanut Noodles", time: "20 min", rating: 4.8, tags: ["Quick", "Asian"], colors: ["#C9956B", "#A06B3E"], emoji: "🍜", fav: true },
  { name: "Mediterranean Bowl", time: "25 min", rating: 4.6, tags: ["Healthy", "Bowl"], colors: ["#7BA06B", "#4A7A3E"], emoji: "🥗", fav: false },
  { name: "Birria Tacos", time: "3 hrs", rating: 4.9, tags: ["Mexican", "Slow Cook"], colors: ["#C0574B", "#8B3E33"], emoji: "🌮", fav: true },
  { name: "Miso Glazed Salmon", time: "30 min", rating: 4.7, tags: ["Japanese", "Seafood"], colors: ["#D4A843", "#B08930"], emoji: "🐟", fav: false },
  { name: "Thai Green Curry", time: "35 min", rating: 4.5, tags: ["Thai", "Spicy"], colors: ["#6B8F5E", "#4A6B3E"], emoji: "🍛", fav: true },
];

const categories = ["All", "Bowls", "Quick", "Asian", "Mexican", "Healthy"];

const mealPlanData = {
  Mon: [
    { meal: "Breakfast", name: "Overnight Oats", emoji: "🥣", colors: ["#C9A882", "#A08660"] },
    { meal: "Lunch", name: "Med Bowl", emoji: "🥗", colors: ["#7BA06B", "#4A7A3E"] },
    { meal: "Dinner", name: "Peanut Noodles", emoji: "🍜", colors: ["#C9956B", "#A06B3E"] },
  ],
  Tue: [
    { meal: "Breakfast", name: "Açaí Bowl", emoji: "🫐", colors: ["#8B6BA0", "#6B4A80"] },
    { meal: "Lunch", name: "Chicken Wrap", emoji: "🌯", colors: ["#C9A065", "#A08040"] },
    { meal: "Dinner", name: "Birria Tacos", emoji: "🌮", colors: ["#C0574B", "#8B3E33"] },
  ],
  Wed: [
    { meal: "Breakfast", name: "Smoothie Bowl", emoji: "🍓", colors: ["#C07070", "#A05050"] },
    { meal: "Lunch", name: "—", emoji: "", colors: ["transparent", "transparent"] },
    { meal: "Dinner", name: "Green Curry", emoji: "🍛", colors: ["#6B8F5E", "#4A6B3E"] },
  ],
};

const groceryData = [
  {
    category: "Produce",
    items: [
      { name: "Baby spinach", qty: "6 oz", checked: true },
      { name: "Avocados", qty: "3", checked: false },
      { name: "Limes", qty: "4", checked: false },
      { name: "Fresh cilantro", qty: "1 bunch", checked: true },
      { name: "Red onion", qty: "2", checked: false },
    ],
  },
  {
    category: "Protein",
    items: [
      { name: "Chicken thighs", qty: "2 lbs", checked: false },
      { name: "Salmon fillets", qty: "4 pcs", checked: false },
      { name: "Firm tofu", qty: "1 block", checked: true },
    ],
  },
  {
    category: "Pantry",
    items: [
      { name: "Coconut milk", qty: "2 cans", checked: false },
      { name: "Peanut butter", qty: "1 jar", checked: false },
      { name: "Soy sauce", qty: "1 bottle", checked: true },
    ],
  },
];

const settingsGroups = [
  {
    title: "Account",
    items: [
      { icon: "User", label: "Profile", subtitle: "Robert" },
      { icon: "Bell", label: "Notifications", subtitle: "Meal reminders on" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: "Palette", label: "Appearance", subtitle: "Light mode" },
      { icon: "Diet", label: "Dietary Preferences", subtitle: "None set" },
      { icon: "Timer", label: "Meal Timing", subtitle: "3 meals/day" },
    ],
  },
  {
    title: "Data & Privacy",
    items: [
      { icon: "Cloud", label: "Sync & Backup", subtitle: "Last synced today" },
      { icon: "Shield", label: "Privacy", subtitle: "" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: "Help", label: "Help Center", subtitle: "" },
      { icon: "Info", label: "About", subtitle: "v1.2.0" },
    ],
  },
];

const settingsIcons = {
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="4" fill={theme.accentLighter}/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  Bell: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="1.8" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Palette: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="7" r="1.5" fill={theme.accent}/><circle cx="8" cy="14" r="1.5" fill={theme.green}/><circle cx="16" cy="14" r="1.5" fill={theme.yellow}/></svg>,
  Diet: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="1.8" strokeLinecap="round"><path d="M3 11h18c0 5.523-4.03 10-9 10S3 16.523 3 11z"/><path d="M12 4c-.5 1-1.5 2-1.5 3"/></svg>,
  Timer: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  Cloud: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="1.8" strokeLinecap="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  Shield: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Help: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>,
  Info: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>,
};

// ============= SCREEN COMPONENTS =============

function RecipesScreen() {
  const [activeCat, setActiveCat] = useState("All");

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 90 }}>
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <h1 style={{ fontFamily: font, fontSize: 28, fontWeight: 600, color: theme.text, margin: 0, letterSpacing: -0.5 }}>Recipes</h1>
          <div style={{
            width: 38, height: 38, borderRadius: 12, background: theme.accent,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 3px 10px ${theme.accent}44`, cursor: "pointer",
          }}>
            <Icons.Plus />
          </div>
        </div>
        <p style={{ fontFamily: sans, fontSize: 13, color: theme.textMuted, margin: 0 }}>
          {recipes.length} recipes in your collection
        </p>
      </div>

      <div style={{ padding: "16px 20px 0" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: theme.card, borderRadius: 14, padding: "11px 14px",
          border: `1px solid ${theme.border}`,
        }}>
          <Icons.Search />
          <span style={{ fontFamily: sans, fontSize: 14, color: theme.textLight }}>Search recipes...</span>
        </div>
      </div>

      <div style={{ padding: "16px 0 0", overflowX: "auto", display: "flex", gap: 8, paddingLeft: 20, paddingRight: 20 }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)} style={{
            fontFamily: sans, fontSize: 13, fontWeight: 500,
            padding: "7px 16px", borderRadius: 20, border: "none",
            background: activeCat === cat ? theme.accent : theme.accentLighter,
            color: activeCat === cat ? "white" : theme.accent,
            cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
          }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        <div style={{
          borderRadius: 20, overflow: "hidden", position: "relative",
          background: `linear-gradient(145deg, ${theme.accentDark}, ${theme.accent})`,
          padding: 20, minHeight: 140,
        }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div style={{ position: "absolute", bottom: -30, right: 30, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: 1, textTransform: "uppercase" }}>Featured</span>
          <h2 style={{ fontFamily: font, fontSize: 22, fontWeight: 600, color: "white", margin: "8px 0 6px", lineHeight: 1.2 }}>Birria Tacos</h2>
          <p style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,0.75)", margin: 0, maxWidth: 200 }}>
            Rich, spicy braised beef with consommé for dipping
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 14, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,0.8)" }}>3 hrs</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(255,220,120,0.9)" stroke="rgba(255,220,120,0.9)" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,0.8)" }}>4.9</span>
            </div>
          </div>
          <div style={{ position: "absolute", right: 16, bottom: 16, fontSize: 48 }}>🌮</div>
        </div>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        <h3 style={{ fontFamily: font, fontSize: 18, fontWeight: 600, color: theme.text, margin: "0 0 14px" }}>Your Collection</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {recipes.map((r, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14,
              background: theme.card, borderRadius: 16, padding: 12,
              border: `1px solid ${theme.border}`,
            }}>
              <RecipeThumb colors={r.colors} emoji={r.emoji} size={68} radius={12} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <h4 style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: theme.text, margin: 0, lineHeight: 1.3 }}>{r.name}</h4>
                  <Icons.Heart filled={r.fav} />
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 6, alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Icons.Clock />
                    <span style={{ fontFamily: sans, fontSize: 12, color: theme.textMuted }}>{r.time}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Icons.Star />
                    <span style={{ fontFamily: sans, fontSize: 12, color: theme.textMuted }}>{r.rating}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  {r.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: sans, fontSize: 11, fontWeight: 500,
                      background: theme.accentLighter, color: theme.accent,
                      padding: "3px 10px", borderRadius: 8,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MealPlanScreen() {
  const [activeDay, setActiveDay] = useState("Mon");
  const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayNums = [24, 25, 26, 27, 28, 1, 2];

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 90 }}>
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontFamily: font, fontSize: 28, fontWeight: 600, color: theme.text, margin: 0, letterSpacing: -0.5 }}>Meal Plan</h1>
          <div style={{
            width: 38, height: 38, borderRadius: 12, background: theme.accent,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 3px 10px ${theme.accent}44`, cursor: "pointer",
          }}>
            <Icons.Plus />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
          <Icons.ArrowLeft />
          <span style={{ fontFamily: sans, fontSize: 13, color: theme.textMuted, fontWeight: 500 }}>Feb 24 – Mar 2</span>
          <Icons.ArrowRight />
        </div>
      </div>

      <div style={{ display: "flex", gap: 0, padding: "18px 12px 0", justifyContent: "space-around" }}>
        {allDays.map((d, i) => {
          const isActive = d === activeDay;
          const hasMeals = mealPlanData[d];
          return (
            <button key={d} onClick={() => setActiveDay(d)} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              padding: "8px 0", width: 44, border: "none", cursor: "pointer",
              background: isActive ? theme.accent : "transparent", borderRadius: 14,
            }}>
              <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 500, color: isActive ? "rgba(255,255,255,0.7)" : theme.textLight }}>{d}</span>
              <span style={{ fontFamily: sans, fontSize: 16, fontWeight: 600, color: isActive ? "white" : theme.text }}>{dayNums[i]}</span>
              {hasMeals && !isActive && <div style={{ width: 5, height: 5, borderRadius: "50%", background: theme.accentLight, marginTop: -2 }} />}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        {(mealPlanData[activeDay] || [
          { meal: "Breakfast", name: "—", emoji: "", colors: ["transparent", "transparent"] },
          { meal: "Lunch", name: "—", emoji: "", colors: ["transparent", "transparent"] },
          { meal: "Dinner", name: "—", emoji: "", colors: ["transparent", "transparent"] },
        ]).map((m, i) => {
          const isEmpty = m.name === "—";
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14,
              background: theme.card, borderRadius: 16, padding: 14,
              border: `1px solid ${theme.border}`, marginBottom: 10,
            }}>
              {isEmpty ? (
                <div style={{
                  width: 56, height: 56, borderRadius: 12, flexShrink: 0,
                  border: `2px dashed ${theme.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.textLight} strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                </div>
              ) : (
                <RecipeThumb colors={m.colors} emoji={m.emoji} size={56} radius={12} />
              )}
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, color: theme.textLight, textTransform: "uppercase", letterSpacing: 0.5 }}>{m.meal}</span>
                <p style={{ fontFamily: font, fontSize: 15, fontWeight: isEmpty ? 400 : 600, color: isEmpty ? theme.textLight : theme.text, margin: "3px 0 0" }}>
                  {isEmpty ? "Tap to add a meal" : m.name}
                </p>
              </div>
              <Icons.Chevron />
            </div>
          );
        })}
      </div>

      {mealPlanData[activeDay] && (
        <div style={{ padding: "10px 20px 0" }}>
          <div style={{ background: theme.card, borderRadius: 16, padding: 18, border: `1px solid ${theme.border}` }}>
            <h4 style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: theme.textLight, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 14px" }}>Daily Overview</h4>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {[
                { label: "Calories", value: "1,840", color: theme.accent },
                { label: "Protein", value: "92g", color: theme.green },
                { label: "Carbs", value: "210g", color: theme.yellow },
                { label: "Fat", value: "68g", color: theme.red },
              ].map(n => (
                <div key={n.label} style={{ textAlign: "center" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: `${n.color}18`, display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 8px",
                  }}>
                    <span style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: n.color }}>{n.value}</span>
                  </div>
                  <span style={{ fontFamily: sans, fontSize: 11, color: theme.textMuted }}>{n.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{
            flex: 1, fontFamily: sans, fontSize: 13, fontWeight: 600,
            padding: "12px 0", borderRadius: 12, border: `1.5px solid ${theme.accent}`,
            background: "transparent", color: theme.accent, cursor: "pointer",
          }}>Copy Last Week</button>
          <button style={{
            flex: 1, fontFamily: sans, fontSize: 13, fontWeight: 600,
            padding: "12px 0", borderRadius: 12, border: "none",
            background: theme.accentLighter, color: theme.accent, cursor: "pointer",
          }}>Auto-Fill</button>
        </div>
      </div>
    </div>
  );
}

function GroceryScreen() {
  const [items, setItems] = useState(groceryData);
  const toggleItem = (ci, ii) => {
    setItems(items.map((cat, c) => c === ci ? {
      ...cat, items: cat.items.map((it, i) => i === ii ? { ...it, checked: !it.checked } : it),
    } : cat));
  };
  const total = items.reduce((a, c) => a + c.items.length, 0);
  const checked = items.reduce((a, c) => a + c.items.filter(i => i.checked).length, 0);

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 90 }}>
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontFamily: font, fontSize: 28, fontWeight: 600, color: theme.text, margin: 0, letterSpacing: -0.5 }}>Grocery List</h1>
          <div style={{
            width: 38, height: 38, borderRadius: 12, background: theme.accent,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 3px 10px ${theme.accent}44`, cursor: "pointer",
          }}>
            <Icons.Plus />
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontFamily: sans, fontSize: 13, color: theme.textMuted }}>{checked} of {total} items</span>
            <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: theme.green }}>{Math.round((checked / total) * 100)}%</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: theme.border, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 3,
              background: `linear-gradient(90deg, ${theme.green}, ${theme.greenDark})`,
              width: `${(checked / total) * 100}%`, transition: "width 0.3s ease",
            }} />
          </div>
        </div>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12,
          background: theme.yellowLight, borderRadius: 8, padding: "5px 12px",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={theme.yellow} strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/></svg>
          <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, color: "#9A7A2A" }}>From this week's meal plan</span>
        </div>
      </div>

      <div style={{ padding: "18px 20px 0" }}>
        {items.map((cat, ci) => (
          <div key={cat.category} style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h3 style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, color: theme.textMuted, textTransform: "uppercase", letterSpacing: 0.8, margin: 0 }}>{cat.category}</h3>
              <span style={{ fontFamily: sans, fontSize: 12, color: theme.textLight }}>{cat.items.filter(i => i.checked).length}/{cat.items.length}</span>
            </div>
            <div style={{ background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
              {cat.items.map((item, ii) => (
                <div key={ii} onClick={() => toggleItem(ci, ii)} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "13px 14px", cursor: "pointer",
                  borderBottom: ii < cat.items.length - 1 ? `1px solid ${theme.border}` : "none",
                  opacity: item.checked ? 0.55 : 1,
                  transition: "opacity 0.2s ease",
                }}>
                  <Icons.Check checked={item.checked} />
                  <span style={{
                    fontFamily: sans, fontSize: 14, fontWeight: 500, color: theme.text, flex: 1,
                    textDecoration: item.checked ? "line-through" : "none",
                  }}>{item.name}</span>
                  <span style={{ fontFamily: sans, fontSize: 12, color: theme.textLight, fontWeight: 500 }}>{item.qty}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsScreen() {
  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 90 }}>
      <div style={{ padding: "20px 20px 0" }}>
        <h1 style={{ fontFamily: font, fontSize: 28, fontWeight: 600, color: theme.text, margin: 0, letterSpacing: -0.5 }}>Settings</h1>
      </div>

      <div style={{ padding: "18px 20px 0" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 14,
          background: theme.card, borderRadius: 18, padding: 16,
          border: `1px solid ${theme.border}`,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 16,
            background: `linear-gradient(145deg, ${theme.accent}, ${theme.accentDark})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, color: "white", fontFamily: font, fontWeight: 700,
          }}>R</div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: font, fontSize: 17, fontWeight: 600, color: theme.text, margin: 0 }}>Robert</h3>
            <p style={{ fontFamily: sans, fontSize: 12, color: theme.textMuted, margin: "2px 0 0" }}>Pro Plan · 127 recipes</p>
          </div>
          <Icons.Chevron />
        </div>
      </div>

      <div style={{ padding: "10px 20px 0" }}>
        {settingsGroups.map((group, gi) => (
          <div key={gi} style={{ marginTop: 18 }}>
            <h4 style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, color: theme.textLight, textTransform: "uppercase", letterSpacing: 0.8, margin: "0 0 10px", paddingLeft: 4 }}>{group.title}</h4>
            <div style={{ background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
              {group.items.map((item, ii) => {
                const IconComp = settingsIcons[item.icon];
                return (
                  <div key={ii} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "13px 14px", cursor: "pointer",
                    borderBottom: ii < group.items.length - 1 ? `1px solid ${theme.border}` : "none",
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, background: theme.bgDeep,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {IconComp && <IconComp />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontFamily: sans, fontSize: 14, fontWeight: 500, color: theme.text }}>{item.label}</span>
                      {item.subtitle && <p style={{ fontFamily: sans, fontSize: 12, color: theme.textLight, margin: "1px 0 0" }}>{item.subtitle}</p>}
                    </div>
                    <Icons.Chevron />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "24px 20px 0", textAlign: "center" }}>
        <button style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: theme.red, background: "transparent", border: "none", cursor: "pointer", padding: "10px 20px" }}>Sign Out</button>
        <p style={{ fontFamily: sans, fontSize: 11, color: theme.textLight, marginTop: 8 }}>Roll A Bowl v1.2.0</p>
      </div>
    </div>
  );
}

// ============= MAIN APP =============

export default function RecipeApp() {
  const [screen, setScreen] = useState(0);
  const screenNames = ["Recipes", "Meal Plan", "Grocery", "Settings"];
  const iconComponents = [Icons.Recipe, Icons.MealPlan, Icons.Grocery, Icons.Settings];

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      minHeight: "100vh", background: "#D9CFC4", padding: 20, fontFamily: sans,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,600;6..72,700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{
        width: 375, height: 812, borderRadius: 44, background: theme.bg,
        boxShadow: "0 25px 60px rgba(60,40,20,0.25), 0 0 0 1px rgba(60,40,20,0.08)",
        display: "flex", flexDirection: "column", position: "relative", overflow: "hidden",
      }}>
        {/* Status bar */}
        <div style={{ height: 50, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "0 28px 6px", flexShrink: 0 }}>
          <span style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: theme.text }}>9:41</span>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <svg width="16" height="12" viewBox="0 0 16 12" fill={theme.text}><rect x="0" y="3" width="3" height="9" rx="1"/><rect x="4.5" y="1.5" width="3" height="10.5" rx="1"/><rect x="9" y="0" width="3" height="12" rx="1"/><rect x="13.5" y="0" width="2.5" height="12" rx="0.5" fill="none" stroke={theme.text} strokeWidth="1"/></svg>
          </div>
        </div>

        {screen === 0 && <RecipesScreen />}
        {screen === 1 && <MealPlanScreen />}
        {screen === 2 && <GroceryScreen />}
        {screen === 3 && <SettingsScreen />}

        {/* Tab Bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "rgba(245,237,228,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderTop: `1px solid ${theme.border}`,
          display: "flex", justifyContent: "space-around",
          padding: "8px 8px 28px", flexShrink: 0,
        }}>
          {screenNames.map((name, i) => {
            const IconComp = iconComponents[i];
            const isActive = screen === i;
            return (
              <button key={name} onClick={() => setScreen(i)} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                background: "none", border: "none", cursor: "pointer", padding: "6px 12px",
              }}>
                <IconComp active={isActive} />
                <span style={{
                  fontFamily: sans, fontSize: 10, fontWeight: isActive ? 700 : 500,
                  color: isActive ? theme.accent : theme.textLight, letterSpacing: 0.2,
                }}>{name}</span>
              </button>
            );
          })}
        </div>

        <div style={{
          position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
          width: 134, height: 5, borderRadius: 3, background: theme.accentDark, opacity: 0.2,
        }} />
      </div>
    </div>
  );
}
