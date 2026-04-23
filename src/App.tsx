import { useState, useMemo, useRef } from "react";

// ─── Types ───────────────────────────────────────────
interface FollowingItem {
  title: string;
  string_list_data: { href: string; timestamp: number }[];
}

interface FollowerItem {
  string_list_data: { href: string; value: string; timestamp: number }[];
}

interface UserEntry {
  username: string;
  timestamp: number;
}

type TabKey = "mutual" | "notFollowBack" | "notFollowingBack";

// ─── Helper: extract usernames ───────────────────────
function parseFollowing(raw: unknown): UserEntry[] {
  const obj = raw as { relationships_following?: FollowingItem[] };
  if (!obj?.relationships_following) return [];
  return obj.relationships_following.map((item) => ({
    username: item.title?.toLowerCase() ?? "",
    timestamp: item.string_list_data?.[0]?.timestamp ?? 0,
  }));
}

function parseFollowers(raw: unknown): UserEntry[] {
  const arr = raw as FollowerItem[];
  if (!Array.isArray(arr)) return [];
  return arr.map((item) => ({
    username: item.string_list_data?.[0]?.value?.toLowerCase() ?? "",
    timestamp: item.string_list_data?.[0]?.timestamp ?? 0,
  }));
}

// ─── Avatar URL ──────────────────────────────────────
function avatarUrl(username: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&size=64&background=random&color=fff&bold=true&format=svg`;
}

// ─── Main App ────────────────────────────────────────
export default function App() {
  const [followingRaw, setFollowingRaw] = useState("");
  const [followersRaw, setFollowersRaw] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("notFollowBack");
  const [search, setSearch] = useState("");

  const fileFollowingRef = useRef<HTMLInputElement>(null);
  const fileFollowersRef = useRef<HTMLInputElement>(null);

  // ── Parse ──────────────────────────────────────────
  const { following, followers } = useMemo(() => {
    try {
      const fwing = followingRaw.trim()
        ? parseFollowing(JSON.parse(followingRaw))
        : [];
      const fwers = followersRaw.trim()
        ? parseFollowers(JSON.parse(followersRaw))
        : [];
      setError("");
      return { following: fwing, followers: fwers };
    } catch {
      setError("Format JSON tidak valid. Periksa kembali data Anda.");
      return { following: [], followers: [] };
    }
  }, [followingRaw, followersRaw]);

  // ── Compute sets ───────────────────────────────────
  const followingSet = useMemo(() => new Set(following.map((f) => f.username)), [following]);
  const followersSet = useMemo(() => new Set(followers.map((f) => f.username)), [followers]);

  const mutual = useMemo(
    () => following.filter((f) => followersSet.has(f.username)),
    [following, followersSet],
  );
  const notFollowBack = useMemo(
    () => following.filter((f) => !followersSet.has(f.username)),
    [following, followersSet],
  );
  const notFollowingBack = useMemo(
    () => followers.filter((f) => !followingSet.has(f.username)),
    [followers, followingSet],
  );

  // ── Filtered lists ─────────────────────────────────
  const filteredData = useMemo(() => {
    const q = search.toLowerCase().trim();
    const tabMap: Record<TabKey, UserEntry[]> = {
      mutual,
      notFollowBack,
      notFollowingBack,
    };
    const list = tabMap[activeTab];
    if (!q) return list;
    return list.filter((u) => u.username.includes(q));
  }, [search, activeTab, mutual, notFollowBack, notFollowingBack]);

  // ── File upload handlers ───────────────────────────
  function handleFileUpload(
    file: File | undefined,
    setter: (v: string) => void,
  ) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setter(reader.result as string);
    reader.readAsText(file);
  }

  // ── Tab config ─────────────────────────────────────
  const tabs: { key: TabKey; label: string; count: number; color: string }[] = [
    { key: "notFollowBack", label: "Tidak Follow Back", count: notFollowBack.length, color: "rose" },
    { key: "notFollowingBack", label: "Tidak Kamu Follow Back", count: notFollowingBack.length, color: "amber" },
    { key: "mutual", label: "Saling Follow", count: mutual.length, color: "emerald" },
  ];

  // ── Render ─────────────────────────────────────────
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Animated background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute left-1/3 top-1/3 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10">
        {/* ── Header ─────────────────────────────────── */}
        <header className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            📊 Instagram Follow Analyzer
          </h1>
          <p className="mt-2 text-sm text-indigo-300/80">
            Analisis siapa yang tidak follow back & siapa yang saling follow
          </p>
        </header>

        {/* ── Input Section ──────────────────────────── */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          {/* Following Input */}
          <div className="glass-card rounded-2xl p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/30 text-xs">👤</span>
                Data Following
              </h2>
              <button
                onClick={() => fileFollowingRef.current?.click()}
                className="glass-btn text-xs"
              >
                📁 Upload JSON
              </button>
              <input
                ref={fileFollowingRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files?.[0], setFollowingRaw)}
              />
            </div>
            <textarea
              value={followingRaw}
              onChange={(e) => setFollowingRaw(e.target.value)}
              placeholder='Paste JSON "relationships_following" di sini...'
              className="glass-input h-40 w-full resize-none rounded-xl p-3 text-sm text-white/90 placeholder:text-white/30"
              spellCheck={false}
            />
            {following.length > 0 && (
              <p className="mt-2 text-xs text-indigo-300">
                ✅ {following.length} akun terdeteksi
              </p>
            )}
          </div>

          {/* Followers Input */}
          <div className="glass-card rounded-2xl p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/30 text-xs">👥</span>
                Data Followers
              </h2>
              <button
                onClick={() => fileFollowersRef.current?.click()}
                className="glass-btn text-xs"
              >
                📁 Upload JSON
              </button>
              <input
                ref={fileFollowersRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files?.[0], setFollowersRaw)}
              />
            </div>
            <textarea
              value={followersRaw}
              onChange={(e) => setFollowersRaw(e.target.value)}
              placeholder='Paste JSON followers di sini...'
              className="glass-input h-40 w-full resize-none rounded-xl p-3 text-sm text-white/90 placeholder:text-white/30"
              spellCheck={false}
            />
            {followers.length > 0 && (
              <p className="mt-2 text-xs text-violet-300">
                ✅ {followers.length} akun terdeteksi
              </p>
            )}
          </div>
        </div>

        {/* ── Error ──────────────────────────────────── */}
        {error && (
          <div className="glass-card mb-6 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-center text-sm text-rose-300">
            ⚠️ {error}
          </div>
        )}

        {/* ── Statistics Cards ───────────────────────── */}
        {following.length > 0 && followers.length > 0 && (
          <>
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard label="Following" value={following.length} icon="👤" />
              <StatCard label="Followers" value={followers.length} icon="👥" />
              <StatCard label="Saling Follow" value={mutual.length} icon="🤝" />
              <StatCard label="Tidak Follow Back" value={notFollowBack.length} icon="⚠️" highlight />
            </div>

            {/* ── Tabs ────────────────────────────────── */}
            <div className="glass-card mb-4 rounded-2xl p-1 flex flex-wrap gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setSearch("");
                  }}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? "bg-white/15 text-white shadow-lg shadow-black/20"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {tab.label}
                  <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/10 px-1.5 text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* ── Search ──────────────────────────────── */}
            <div className="glass-card mb-4 rounded-xl p-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`🔍 Cari username di daftar "${tabs.find((t) => t.key === activeTab)?.label}"...`}
                className="glass-input w-full rounded-lg px-4 py-2 text-sm text-white/90 placeholder:text-white/30"
              />
            </div>

            {/* ── User List ───────────────────────────── */}
            <div className="glass-card rounded-2xl p-4">
              {filteredData.length === 0 ? (
                <div className="py-16 text-center text-white/40">
                  <div className="mb-2 text-4xl">📭</div>
                  <p className="text-sm">
                    {search.trim()
                      ? "Tidak ada username yang cocok"
                      : "Daftar kosong"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {filteredData.map((user) => (
                    <a
                      key={user.username}
                      href={`https://instagram.com/${user.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-2 rounded-xl bg-white/5 p-3 transition-all duration-200 hover:bg-white/10 hover:scale-[1.03]"
                    >
                      <div className="relative">
                        <img
                          src={avatarUrl(user.username)}
                          alt={user.username}
                          className="h-14 w-14 rounded-full ring-2 ring-white/10 transition-all group-hover:ring-white/30"
                          loading="lazy"
                        />
                      </div>
                      <span className="truncate w-full text-center text-xs font-medium text-white/80 group-hover:text-white">
                        @{user.username}
                      </span>
                    </a>
                  ))}
                </div>
              )}
              {filteredData.length > 0 && (
                <p className="mt-3 text-center text-xs text-white/30">
                  Menampilkan {filteredData.length} akun
                </p>
              )}
            </div>
          </>
        )}

        {/* ── Empty state ────────────────────────────── */}
        {following.length === 0 && followers.length === 0 && !error && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="mb-3 text-5xl">📂</div>
            <p className="text-white/60">
              Upload atau paste data JSON <strong>Following</strong> dan{" "}
              <strong>Followers</strong> Instagram untuk mulai analisis.
            </p>
            <p className="mt-2 text-xs text-white/30">
              Data bisa didapat dari fitur Download Data di Instagram
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Stat Card Component ──────────────────────────────
function StatCard({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: number;
  icon: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`glass-card rounded-xl p-4 text-center transition-all hover:scale-[1.02] ${
        highlight && value > 0 ? "ring-1 ring-rose-500/30" : ""
      }`}
    >
      <div className="mb-1 text-2xl">{icon}</div>
      <div className="text-2xl font-bold text-white">{value.toLocaleString()}</div>
      <div className="text-xs text-white/50">{label}</div>
    </div>
  );
}
