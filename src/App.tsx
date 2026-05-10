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
type CompareTabKey = "newFollowers" | "unfollowers" | "newFollowing" | "unfollowing";
type ViewMode = "single" | "compare";

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
  const [viewMode, setViewMode] = useState<ViewMode>("single");

  // Single mode data
  const [followingRaw, setFollowingRaw] = useState("");
  const [followersRaw, setFollowersRaw] = useState("");

  // Compare mode data
  const [following1Raw, setFollowing1Raw] = useState("");
  const [followers1Raw, setFollowers1Raw] = useState("");
  const [following2Raw, setFollowing2Raw] = useState("");
  const [followers2Raw, setFollowers2Raw] = useState("");

  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("notFollowBack");
  const [compareTab, setCompareTab] = useState<CompareTabKey>("unfollowers");
  const [search, setSearch] = useState("");

  const fileFollowingRef = useRef<HTMLInputElement>(null);
  const fileFollowersRef = useRef<HTMLInputElement>(null);
  const fileFollowing1Ref = useRef<HTMLInputElement>(null);
  const fileFollowers1Ref = useRef<HTMLInputElement>(null);
  const fileFollowing2Ref = useRef<HTMLInputElement>(null);
  const fileFollowers2Ref = useRef<HTMLInputElement>(null);

  // ── Parse ──────────────────────────────────────────
  const { following, followers } = useMemo(() => {
    if (viewMode === "compare") return { following: [], followers: [] };
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
  }, [followingRaw, followersRaw, viewMode]);

  // ── Parse compare mode data ────────────────────────
  const { following1, followers1, following2, followers2 } = useMemo(() => {
    if (viewMode === "single") return { following1: [], followers1: [], following2: [], followers2: [] };
    try {
      const fwing1 = following1Raw.trim() ? parseFollowing(JSON.parse(following1Raw)) : [];
      const fwers1 = followers1Raw.trim() ? parseFollowers(JSON.parse(followers1Raw)) : [];
      const fwing2 = following2Raw.trim() ? parseFollowing(JSON.parse(following2Raw)) : [];
      const fwers2 = followers2Raw.trim() ? parseFollowers(JSON.parse(followers2Raw)) : [];
      setError("");
      return { following1: fwing1, followers1: fwers1, following2: fwing2, followers2: fwers2 };
    } catch {
      setError("Format JSON tidak valid. Periksa kembali data Anda.");
      return { following1: [], followers1: [], following2: [], followers2: [] };
    }
  }, [following1Raw, followers1Raw, following2Raw, followers2Raw, viewMode]);

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

  // ── Compute compare mode differences ───────────────
  const following1Set = useMemo(() => new Set(following1.map((f) => f.username)), [following1]);
  const followers1Set = useMemo(() => new Set(followers1.map((f) => f.username)), [followers1]);
  const following2Set = useMemo(() => new Set(following2.map((f) => f.username)), [following2]);
  const followers2Set = useMemo(() => new Set(followers2.map((f) => f.username)), [followers2]);

  // New followers: in period 2 but not in period 1
  const newFollowers = useMemo(
    () => followers2.filter((f) => !followers1Set.has(f.username)),
    [followers2, followers1Set],
  );

  // Unfollowers: in period 1 but not in period 2
  const unfollowers = useMemo(
    () => followers1.filter((f) => !followers2Set.has(f.username)),
    [followers1, followers2Set],
  );

  // New following: in period 2 but not in period 1
  const newFollowing = useMemo(
    () => following2.filter((f) => !following1Set.has(f.username)),
    [following2, following1Set],
  );

  // Unfollowing: in period 1 but not in period 2
  const unfollowing = useMemo(
    () => following1.filter((f) => !following2Set.has(f.username)),
    [following1, following2Set],
  );

  // ── Filtered lists ─────────────────────────────────
  const filteredData = useMemo(() => {
    const q = search.toLowerCase().trim();

    if (viewMode === "single") {
      const tabMap: Record<TabKey, UserEntry[]> = {
        mutual,
        notFollowBack,
        notFollowingBack,
      };
      const list = tabMap[activeTab];
      if (!q) return list;
      return list.filter((u) => u.username.includes(q));
    } else {
      const compareTabMap: Record<CompareTabKey, UserEntry[]> = {
        newFollowers,
        unfollowers,
        newFollowing,
        unfollowing,
      };
      const list = compareTabMap[compareTab];
      if (!q) return list;
      return list.filter((u) => u.username.includes(q));
    }
  }, [search, viewMode, activeTab, compareTab, mutual, notFollowBack, notFollowingBack, newFollowers, unfollowers, newFollowing, unfollowing]);

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

  const compareTabs: { key: CompareTabKey; label: string; count: number; color: string }[] = [
    { key: "unfollowers", label: "Yang Unfollow Kamu", count: unfollowers.length, color: "rose" },
    { key: "newFollowers", label: "Follower Baru", count: newFollowers.length, color: "emerald" },
    { key: "unfollowing", label: "Yang Kamu Unfollow", count: unfollowing.length, color: "amber" },
    { key: "newFollowing", label: "Following Baru", count: newFollowing.length, color: "cyan" },
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

        {/* ── Mode Selector ──────────────────────────── */}
        <div className="glass-card mb-6 rounded-2xl p-1 flex gap-1">
          <button
            onClick={() => {
              setViewMode("single");
              setSearch("");
              setError("");
            }}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              viewMode === "single"
                ? "bg-white/15 text-white shadow-lg shadow-black/20"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            📸 Mode Tunggal
          </button>
          <button
            onClick={() => {
              setViewMode("compare");
              setSearch("");
              setError("");
            }}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              viewMode === "compare"
                ? "bg-white/15 text-white shadow-lg shadow-black/20"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            🔄 Mode Perbandingan
          </button>
        </div>

        {/* ── Input Section ──────────────────────────── */}
        {viewMode === "single" ? (
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
        ) : (
          <div className="mb-6 space-y-6">
            {/* Period 1 */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="mb-4 text-center text-sm font-semibold text-white">
                📅 Periode 1 (Data Lama)
              </h3>
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-xs font-medium text-white/80">Following Periode 1</h4>
                    <button
                      onClick={() => fileFollowing1Ref.current?.click()}
                      className="glass-btn text-xs"
                    >
                      📁 Upload
                    </button>
                    <input
                      ref={fileFollowing1Ref}
                      type="file"
                      accept=".json,application/json"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files?.[0], setFollowing1Raw)}
                    />
                  </div>
                  <textarea
                    value={following1Raw}
                    onChange={(e) => setFollowing1Raw(e.target.value)}
                    placeholder="Paste JSON following periode 1..."
                    className="glass-input h-32 w-full resize-none rounded-xl p-3 text-sm text-white/90 placeholder:text-white/30"
                    spellCheck={false}
                  />
                  {following1.length > 0 && (
                    <p className="mt-1 text-xs text-indigo-300">
                      ✅ {following1.length} akun
                    </p>
                  )}
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-xs font-medium text-white/80">Followers Periode 1</h4>
                    <button
                      onClick={() => fileFollowers1Ref.current?.click()}
                      className="glass-btn text-xs"
                    >
                      📁 Upload
                    </button>
                    <input
                      ref={fileFollowers1Ref}
                      type="file"
                      accept=".json,application/json"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files?.[0], setFollowers1Raw)}
                    />
                  </div>
                  <textarea
                    value={followers1Raw}
                    onChange={(e) => setFollowers1Raw(e.target.value)}
                    placeholder="Paste JSON followers periode 1..."
                    className="glass-input h-32 w-full resize-none rounded-xl p-3 text-sm text-white/90 placeholder:text-white/30"
                    spellCheck={false}
                  />
                  {followers1.length > 0 && (
                    <p className="mt-1 text-xs text-violet-300">
                      ✅ {followers1.length} akun
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Period 2 */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="mb-4 text-center text-sm font-semibold text-white">
                📅 Periode 2 (Data Baru)
              </h3>
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-xs font-medium text-white/80">Following Periode 2</h4>
                    <button
                      onClick={() => fileFollowing2Ref.current?.click()}
                      className="glass-btn text-xs"
                    >
                      📁 Upload
                    </button>
                    <input
                      ref={fileFollowing2Ref}
                      type="file"
                      accept=".json,application/json"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files?.[0], setFollowing2Raw)}
                    />
                  </div>
                  <textarea
                    value={following2Raw}
                    onChange={(e) => setFollowing2Raw(e.target.value)}
                    placeholder="Paste JSON following periode 2..."
                    className="glass-input h-32 w-full resize-none rounded-xl p-3 text-sm text-white/90 placeholder:text-white/30"
                    spellCheck={false}
                  />
                  {following2.length > 0 && (
                    <p className="mt-1 text-xs text-indigo-300">
                      ✅ {following2.length} akun
                    </p>
                  )}
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-xs font-medium text-white/80">Followers Periode 2</h4>
                    <button
                      onClick={() => fileFollowers2Ref.current?.click()}
                      className="glass-btn text-xs"
                    >
                      📁 Upload
                    </button>
                    <input
                      ref={fileFollowers2Ref}
                      type="file"
                      accept=".json,application/json"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files?.[0], setFollowers2Raw)}
                    />
                  </div>
                  <textarea
                    value={followers2Raw}
                    onChange={(e) => setFollowers2Raw(e.target.value)}
                    placeholder="Paste JSON followers periode 2..."
                    className="glass-input h-32 w-full resize-none rounded-xl p-3 text-sm text-white/90 placeholder:text-white/30"
                    spellCheck={false}
                  />
                  {followers2.length > 0 && (
                    <p className="mt-1 text-xs text-violet-300">
                      ✅ {followers2.length} akun
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Error ──────────────────────────────────── */}
        {error && (
          <div className="glass-card mb-6 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-center text-sm text-rose-300">
            ⚠️ {error}
          </div>
        )}

        {/* ── Statistics Cards ───────────────────────── */}
        {viewMode === "single" && following.length > 0 && followers.length > 0 && (
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

        {/* ── Compare Mode Statistics & Results ──────── */}
        {viewMode === "compare" && following1.length > 0 && followers1.length > 0 && following2.length > 0 && followers2.length > 0 && (
          <>
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard label="Follower Baru" value={newFollowers.length} icon="✨" highlight />
              <StatCard label="Yang Unfollow" value={unfollowers.length} icon="💔" />
              <StatCard label="Following Baru" value={newFollowing.length} icon="➕" />
              <StatCard label="Yang Di-unfollow" value={unfollowing.length} icon="➖" />
            </div>

            {/* ── Compare Tabs ────────────────────────── */}
            <div className="glass-card mb-4 rounded-2xl p-1 flex flex-wrap gap-1">
              {compareTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setCompareTab(tab.key);
                    setSearch("");
                  }}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    compareTab === tab.key
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
                placeholder={`🔍 Cari username di daftar "${compareTabs.find((t) => t.key === compareTab)?.label}"...`}
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
                      : "Tidak ada perubahan"}
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
        {viewMode === "single" && following.length === 0 && followers.length === 0 && !error && (
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

        {viewMode === "compare" && (following1.length === 0 || followers1.length === 0 || following2.length === 0 || followers2.length === 0) && !error && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="mb-3 text-5xl">🔄</div>
            <p className="text-white/60">
              Upload data <strong>Periode 1</strong> dan <strong>Periode 2</strong> untuk melihat perubahan koneksi Instagram Anda.
            </p>
            <p className="mt-2 text-xs text-white/30">
              Periode 1 = Data lama | Periode 2 = Data baru
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
