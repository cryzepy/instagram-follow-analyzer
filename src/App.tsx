import { useState, useMemo, useRef } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { parseFollowing, parseFollowers } from "./utils/parse";
import type { TabKey, CompareTabKey, ViewMode, UserEntry } from "./types";
import { DropZone } from "./components/DropZone";
import { DataCard } from "./components/DataCard";
import { StatCard } from "./components/StatCard";
import { UserCard } from "./components/UserCard";
import { ConfirmModal } from "./components/ConfirmModal";
import { JsonPreviewModal } from "./components/JsonPreviewModal";

const STORAGE_KEY = "ig-analyzer";

export default function App() {
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>("viewMode", "single", STORAGE_KEY);

  // Single mode data
  const [followingRaw, setFollowingRaw] = useLocalStorage("followingRaw", "", STORAGE_KEY);
  const [followersRaw, setFollowersRaw] = useLocalStorage("followersRaw", "", STORAGE_KEY);

  // Compare mode data
  const [following1Raw, setFollowing1Raw] = useLocalStorage("following1Raw", "", STORAGE_KEY);
  const [followers1Raw, setFollowers1Raw] = useLocalStorage("followers1Raw", "", STORAGE_KEY);
  const [following2Raw, setFollowing2Raw] = useLocalStorage("following2Raw", "", STORAGE_KEY);
  const [followers2Raw, setFollowers2Raw] = useLocalStorage("followers2Raw", "", STORAGE_KEY);

  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [previewJson, setPreviewJson] = useState("");
  const [sortNewest, setSortNewest] = useState(true);
  const [activeTab, setActiveTab] = useLocalStorage<TabKey>("activeTab", "notFollowBack", STORAGE_KEY);
  const [compareTab, setCompareTab] = useLocalStorage<CompareTabKey>("compareTab", "unfollowers", STORAGE_KEY);
  const [search, setSearch] = useState("");

  const fileFollowingRef = useRef<HTMLInputElement>(null);
  const fileFollowersRef = useRef<HTMLInputElement>(null);
  const fileFollowing1Ref = useRef<HTMLInputElement>(null);
  const fileFollowers1Ref = useRef<HTMLInputElement>(null);
  const fileFollowing2Ref = useRef<HTMLInputElement>(null);
  const fileFollowers2Ref = useRef<HTMLInputElement>(null);

  // ── Parse single mode ──────────────────────────────
  const { following, followers } = useMemo(() => {
    if (viewMode === "compare") return { following: [], followers: [] };
    try {
      const fwing = followingRaw.trim() ? parseFollowing(JSON.parse(followingRaw)) : [];
      const fwers = followersRaw.trim() ? parseFollowers(JSON.parse(followersRaw)) : [];
      setError("");
      return { following: fwing, followers: fwers };
    } catch {
      setError("Invalid JSON format. Please check your data.");
      return { following: [], followers: [] };
    }
  }, [followingRaw, followersRaw, viewMode]);

  // ── Parse compare mode ─────────────────────────────
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
      setError("Invalid JSON format. Please check your data.");
      return { following1: [], followers1: [], following2: [], followers2: [] };
    }
  }, [following1Raw, followers1Raw, following2Raw, followers2Raw, viewMode]);

  // ── Compute sets ───────────────────────────────────
  const followingSet = useMemo(() => new Set(following.map((f) => f.username)), [following]);
  const followersSet = useMemo(() => new Set(followers.map((f) => f.username)), [followers]);

  const mutual = useMemo(() => following.filter((f) => followersSet.has(f.username)), [following, followersSet]);
  const notFollowBack = useMemo(() => following.filter((f) => !followersSet.has(f.username)), [following, followersSet]);
  const notFollowingBack = useMemo(() => followers.filter((f) => !followingSet.has(f.username)), [followers, followingSet]);

  // ── Compute compare mode differences ───────────────
  const following1Set = useMemo(() => new Set(following1.map((f) => f.username)), [following1]);
  const followers1Set = useMemo(() => new Set(followers1.map((f) => f.username)), [followers1]);
  const following2Set = useMemo(() => new Set(following2.map((f) => f.username)), [following2]);
  const followers2Set = useMemo(() => new Set(followers2.map((f) => f.username)), [followers2]);

  const newFollowers = useMemo(() => followers2.filter((f) => !followers1Set.has(f.username)), [followers2, followers1Set]);
  const unfollowers = useMemo(() => followers1.filter((f) => !followers2Set.has(f.username)), [followers1, followers2Set]);
  const newFollowing = useMemo(() => following2.filter((f) => !following1Set.has(f.username)), [following2, following1Set]);
  const unfollowing = useMemo(() => following1.filter((f) => !following2Set.has(f.username)), [following1, following2Set]);

  // ── Filtered & sorted lists ────────────────────────
  const filteredData = useMemo(() => {
    const q = search.toLowerCase().trim();
    const pick: UserEntry[] =
      viewMode === "single"
        ? ({ mutual, notFollowBack, notFollowingBack } as Record<TabKey, UserEntry[]>)[activeTab]
        : ({ newFollowers, unfollowers, newFollowing, unfollowing } as Record<CompareTabKey, UserEntry[]>)[compareTab];
    let list = pick;
    if (q) list = list.filter((u) => u.username.includes(q));
    return [...list].sort((a, b) => {
      if (!a.timestamp && !b.timestamp) return 0;
      if (!a.timestamp) return 1;
      if (!b.timestamp) return -1;
      return sortNewest ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
    });
  }, [search, viewMode, activeTab, compareTab, mutual, notFollowBack, notFollowingBack, newFollowers, unfollowers, newFollowing, unfollowing, sortNewest]);

  // ── File upload handler ────────────────────────────
  function handleFileUpload(file: File | undefined, setter: (v: string) => void) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setter(reader.result as string);
    reader.readAsText(file);
  }

  // ── Tab config ─────────────────────────────────────
  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: "notFollowBack", label: "Not Following Back", count: notFollowBack.length },
    { key: "notFollowingBack", label: "Not Followed Back", count: notFollowingBack.length },
    { key: "mutual", label: "Mutuals", count: mutual.length },
  ];
  const compareTabs: { key: CompareTabKey; label: string; count: number }[] = [
    { key: "unfollowers", label: "Unfollowers", count: unfollowers.length },
    { key: "newFollowers", label: "New Followers", count: newFollowers.length },
    { key: "unfollowing", label: "Unfollowed", count: unfollowing.length },
    { key: "newFollowing", label: "New Following", count: newFollowing.length },
  ];

  // ── Render ─────────────────────────────────────────
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute left-1/3 top-1/3 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10">
        {/* ── Header ────────────────────────────────── */}
        <header className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            📊 Instagram Follow Analyzer
          </h1>
          <p className="mt-2 text-sm text-indigo-300/80">
            Analyze who doesn't follow back and who are mutuals
          </p>
          <button
            onClick={() => setShowConfirm(true)}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-white/40 transition-all hover:bg-rose-500/20 hover:text-rose-300"
            title="Clear all saved data (localStorage)"
          >
            🗑️ Clear Data
          </button>
        </header>

        {/* ── Mode Selector ─────────────────────────── */}
        <div className="glass-card mb-6 rounded-xl p-1 flex gap-1">
          <button
            onClick={() => { setViewMode("single"); setSearch(""); setError(""); }}
            className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
              viewMode === "single" ? "bg-white/15 text-white shadow-lg shadow-black/20" : "text-white/50 hover:text-white/80"
            }`}
          >
            📸 Single Mode
          </button>
          <button
            onClick={() => { setViewMode("compare"); setSearch(""); setError(""); }}
            className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
              viewMode === "compare" ? "bg-white/15 text-white shadow-lg shadow-black/20" : "text-white/50 hover:text-white/80"
            }`}
          >
            🔄 Compare Mode
          </button>
        </div>

        {/* ── Input Section ─────────────────────────── */}
        {viewMode === "single" ? (
          <div className="mb-6 grid gap-6 lg:grid-cols-2">
            <DropZone onFile={setFollowingRaw}>
              <DataCard label="Data Following" icon="👤" raw={followingRaw} data={following}
                onUpload={() => fileFollowingRef.current?.click()} onPreview={() => setPreviewJson(followingRaw)} />
              <input ref={fileFollowingRef} type="file" accept=".json,application/json" className="hidden"
                onChange={(e) => handleFileUpload(e.target.files?.[0], setFollowingRaw)} />
            </DropZone>
            <DropZone onFile={setFollowersRaw}>
              <DataCard label="Data Followers" icon="👥" raw={followersRaw} data={followers}
                onUpload={() => fileFollowersRef.current?.click()} onPreview={() => setPreviewJson(followersRaw)} />
              <input ref={fileFollowersRef} type="file" accept=".json,application/json" className="hidden"
                onChange={(e) => handleFileUpload(e.target.files?.[0], setFollowersRaw)} />
            </DropZone>
          </div>
        ) : (
          <div className="mb-6 space-y-6">
            <div className="glass-card rounded-xl p-5">
              <h3 className="mb-4 text-center text-sm font-semibold text-white">📅 Period 1 (Old Data)</h3>
              <div className="grid gap-4 lg:grid-cols-2">
                <DropZone onFile={setFollowing1Raw}>
                  <DataCard label="Period 1 Following" icon="👤" raw={following1Raw} data={following1}
                    onUpload={() => fileFollowing1Ref.current?.click()} onPreview={() => setPreviewJson(following1Raw)} />
                  <input ref={fileFollowing1Ref} type="file" accept=".json,application/json" className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files?.[0], setFollowing1Raw)} />
                </DropZone>
                <DropZone onFile={setFollowers1Raw}>
                  <DataCard label="Period 1 Followers" icon="👥" raw={followers1Raw} data={followers1}
                    onUpload={() => fileFollowers1Ref.current?.click()} onPreview={() => setPreviewJson(followers1Raw)} />
                  <input ref={fileFollowers1Ref} type="file" accept=".json,application/json" className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files?.[0], setFollowers1Raw)} />
                </DropZone>
              </div>
            </div>
            <div className="glass-card rounded-xl p-5">
              <h3 className="mb-4 text-center text-sm font-semibold text-white">📅 Period 2 (New Data)</h3>
              <div className="grid gap-4 lg:grid-cols-2">
                <DropZone onFile={setFollowing2Raw}>
                  <DataCard label="Period 2 Following" icon="👤" raw={following2Raw} data={following2}
                    onUpload={() => fileFollowing2Ref.current?.click()} onPreview={() => setPreviewJson(following2Raw)} />
                  <input ref={fileFollowing2Ref} type="file" accept=".json,application/json" className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files?.[0], setFollowing2Raw)} />
                </DropZone>
                <DropZone onFile={setFollowers2Raw}>
                  <DataCard label="Period 2 Followers" icon="👥" raw={followers2Raw} data={followers2}
                    onUpload={() => fileFollowers2Ref.current?.click()} onPreview={() => setPreviewJson(followers2Raw)} />
                  <input ref={fileFollowers2Ref} type="file" accept=".json,application/json" className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files?.[0], setFollowers2Raw)} />
                </DropZone>
              </div>
            </div>
          </div>
        )}

        {/* ── Error ─────────────────────────────────── */}
        {error && (
          <div className="glass-card mb-6 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-center text-sm text-rose-300">
            ⚠️ {error}
          </div>
        )}

        {/* ── Single Mode Results ────────────────────── */}
        {viewMode === "single" && following.length > 0 && followers.length > 0 && (
          <>
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard label="Following" value={following.length} icon="👤" />
              <StatCard label="Followers" value={followers.length} icon="👥" />
              <StatCard label="Mutuals" value={mutual.length} icon="🤝" />
              <StatCard label="Not Following Back" value={notFollowBack.length} icon="⚠️" highlight />
            </div>
            <div className="glass-card mb-4 rounded-xl p-1 flex flex-wrap gap-1">
              {tabs.map((tab) => (
                <button key={tab.key}
                  onClick={() => { setActiveTab(tab.key); setSearch(""); }}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.key ? "bg-white/15 text-white shadow-lg shadow-black/20" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {tab.label}
                  <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/10 px-1.5 text-xs">{tab.count}</span>
                </button>
              ))}
            </div>
            <div className="glass-card mb-4 rounded-xl p-3">
              <div className="flex gap-2">
                <input type="text" value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`🔍 Search username in "${tabs.find((t) => t.key === activeTab)?.label}"...`}
                  className="glass-input flex-1 rounded-md px-4 py-2 text-sm text-white/90 placeholder:text-white/30" />
                <button onClick={() => setSortNewest((v) => !v)}
                  className={`flex shrink-0 items-center gap-1 rounded-md px-3 py-2 text-xs font-medium transition-all ${
                    sortNewest ? "bg-indigo-500/30 text-indigo-200" : "bg-white/5 text-white/50 hover:text-white/80"
                  }`}
                  title={sortNewest ? "Newest → Oldest" : "Oldest → Newest"}
                >
                  {sortNewest ? "🆕 Newest" : "📅 Oldest"}
                </button>
              </div>
            </div>
            <div className="glass-card rounded-xl p-4">
              {filteredData.length === 0 ? (
                <div className="py-16 text-center text-white/40">
                  <div className="mb-2 text-4xl">📭</div>
                  <p className="text-sm">{search.trim() ? "No matching username" : "Empty list"}</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {filteredData.map((user) => <UserCard key={user.username} user={user} />)}
                </div>
              )}
              {filteredData.length > 0 && (
                <p className="mt-3 text-center text-xs text-white/30">Showing {filteredData.length} accounts</p>
              )}
            </div>
          </>
        )}

        {/* ── Compare Mode Results ───────────────────── */}
        {viewMode === "compare" && following1.length > 0 && followers1.length > 0 && following2.length > 0 && followers2.length > 0 && (
          <>
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard label="New Followers" value={newFollowers.length} icon="✨" highlight />
              <StatCard label="Unfollowers" value={unfollowers.length} icon="💔" />
              <StatCard label="New Following" value={newFollowing.length} icon="➕" />
              <StatCard label="Unfollowed" value={unfollowing.length} icon="➖" />
            </div>
            <div className="glass-card mb-4 rounded-xl p-1 flex flex-wrap gap-1">
              {compareTabs.map((tab) => (
                <button key={tab.key}
                  onClick={() => { setCompareTab(tab.key); setSearch(""); }}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    compareTab === tab.key ? "bg-white/15 text-white shadow-lg shadow-black/20" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {tab.label}
                  <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/10 px-1.5 text-xs">{tab.count}</span>
                </button>
              ))}
            </div>
            <div className="glass-card mb-4 rounded-xl p-3">
              <div className="flex gap-2">
                <input type="text" value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`🔍 Search username in "${compareTabs.find((t) => t.key === compareTab)?.label}"...`}
                  className="glass-input flex-1 rounded-md px-4 py-2 text-sm text-white/90 placeholder:text-white/30" />
                <button onClick={() => setSortNewest((v) => !v)}
                  className={`flex shrink-0 items-center gap-1 rounded-md px-3 py-2 text-xs font-medium transition-all ${
                    sortNewest ? "bg-indigo-500/30 text-indigo-200" : "bg-white/5 text-white/50 hover:text-white/80"
                  }`}
                  title={sortNewest ? "Newest → Oldest" : "Oldest → Newest"}
                >
                  {sortNewest ? "🆕 Newest" : "📅 Oldest"}
                </button>
              </div>
            </div>
            <div className="glass-card rounded-xl p-4">
              {filteredData.length === 0 ? (
                <div className="py-16 text-center text-white/40">
                  <div className="mb-2 text-4xl">📭</div>
                  <p className="text-sm">{search.trim() ? "No matching username" : "No changes found"}</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {filteredData.map((user) => <UserCard key={user.username} user={user} />)}
                </div>
              )}
              {filteredData.length > 0 && (
                <p className="mt-3 text-center text-xs text-white/30">Showing {filteredData.length} accounts</p>
              )}
            </div>
          </>
        )}

        {/* ── Empty states ───────────────────────────── */}
        {viewMode === "single" && following.length === 0 && followers.length === 0 && !error && (
          <div className="glass-card rounded-xl p-12 text-center">
            <div className="mb-3 text-5xl">📂</div>
            <p className="text-white/60">Upload your Instagram <strong>Following</strong> and <strong>Followers</strong> JSON data to start analyzing.</p>
            <p className="mt-2 text-xs text-white/30">You can get this data from Instagram's Download Your Information feature</p>
          </div>
        )}
        {viewMode === "compare" && (following1.length === 0 || followers1.length === 0 || following2.length === 0 || followers2.length === 0) && !error && (
          <div className="glass-card rounded-xl p-12 text-center">
            <div className="mb-3 text-5xl">🔄</div>
            <p className="text-white/60">Upload your <strong>Period 1</strong> and <strong>Period 2</strong> data to see your Instagram connection changes.</p>
            <p className="mt-2 text-xs text-white/30">Period 1 = Old data | Period 2 = New data</p>
          </div>
        )}

        {/* ── Modals ────────────────────────────────── */}
        {previewJson && <JsonPreviewModal json={previewJson} onClose={() => setPreviewJson("")} />}
        {showConfirm && (
          <ConfirmModal
            onConfirm={() => {
              const keys = Object.keys(localStorage).filter((k) => k.startsWith(`${STORAGE_KEY}:`));
              keys.forEach((k) => localStorage.removeItem(k));
              window.location.reload();
            }}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </div>
    </div>
  );
}
