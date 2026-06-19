export interface Translations {
  // Header
  title: string;
  subtitle: string;
  clearData: string;
  clearDataTitle: string;

  // Mode selector
  singleMode: string;
  compareMode: string;

  // Period headers
  period1: string;
  period2: string;

  // Data card labels
  dataFollowing: string;
  dataFollowers: string;
  period1Following: string;
  period1Followers: string;
  period2Following: string;
  period2Followers: string;

  // Stats (single)
  statFollowing: string;
  statFollowers: string;
  statMutuals: string;
  statNotFollowingBack: string;

  // Tabs (single)
  notFollowingBack: string;
  notFollowedBack: string;
  mutuals: string;

  // Stats (compare)
  statNewFollowers: string;
  statUnfollowers: string;
  statNewFollowing: string;
  statUnfollowed: string;

  // Search & sort
  searchPlaceholder: string; // {label} = active tab name
  newest: string;
  oldest: string;
  sortNewestTitle: string;
  sortOldestTitle: string;

  // Empty states
  noMatchingUsername: string;
  emptyList: string;
  noChangesFound: string;

  // Count
  showingAccounts: string; // {count}

  // Error
  invalidJson: string;

  // DataCard
  detail: string;
  uploadJson: string;
  accountsDetected: string; // {count}
  latest: string;
  uploadOrDrop: string;

  // DropZone
  dropJsonHere: string;

  // ConfirmModal
  clearAllData: string;
  clearDataDesc: string;
  cancel: string;
  delete: string;

  // JsonPreviewModal
  rawJson: string;
  close: string;

  // Empty upload states
  uploadPromptSingle: string;
  uploadHint: string;
  uploadPromptCompare: string;
  uploadHintCompare: string;

  // Language toggle
  langEn: string;
  langId: string;
}

export const en: Translations = {
  // Header
  title: "Instagram Follow Analyzer",
  subtitle: "Analyze who doesn't follow back and who are mutuals",
  clearData: "Clear Data",
  clearDataTitle: "Clear all saved data (localStorage)",

  // Mode selector
  singleMode: "Single Mode",
  compareMode: "Compare Mode",

  // Period headers
  period1: "📅 Period 1 (Old Data)",
  period2: "📅 Period 2 (New Data)",

  // Data card labels
  dataFollowing: "Data Following",
  dataFollowers: "Data Followers",
  period1Following: "Period 1 Following",
  period1Followers: "Period 1 Followers",
  period2Following: "Period 2 Following",
  period2Followers: "Period 2 Followers",

  // Stats (single)
  statFollowing: "Following",
  statFollowers: "Followers",
  statMutuals: "Mutuals",
  statNotFollowingBack: "Not Following Back",

  // Tabs (single)
  notFollowingBack: "Not Following Back",
  notFollowedBack: "Not Followed Back",
  mutuals: "Mutuals",

  // Stats (compare)
  statNewFollowers: "New Followers",
  statUnfollowers: "Unfollowers",
  statNewFollowing: "New Following",
  statUnfollowed: "Unfollowed",

  // Search & sort
  searchPlaceholder: '🔍 Search username in "{label}"...',
  newest: "Newest",
  oldest: "Oldest",
  sortNewestTitle: "Newest → Oldest",
  sortOldestTitle: "Oldest → Newest",

  // Empty states
  noMatchingUsername: "No matching username",
  emptyList: "Empty list",
  noChangesFound: "No changes found",

  // Count
  showingAccounts: "Showing {count} accounts",

  // Error
  invalidJson: "Invalid JSON format. Please check your data.",

  // DataCard
  detail: "Detail",
  uploadJson: "Upload JSON",
  accountsDetected: "{count} accounts detected",
  latest: "Latest:",
  uploadOrDrop: "Upload or drag & drop a JSON file",

  // DropZone
  dropJsonHere: "Drop your JSON file here",

  // ConfirmModal
  clearAllData: "Clear All Data?",
  clearDataDesc: "All saved JSON data will be removed. This action cannot be undone.",
  cancel: "Cancel",
  delete: "Delete",

  // JsonPreviewModal
  rawJson: "Raw JSON",
  close: "Close",

  // Empty upload states
  uploadPromptSingle: "Upload your Instagram <b>Following</b> and <b>Followers</b> JSON data to start analyzing.",
  uploadHint: "You can get this data from Instagram's Download Your Information feature",
  uploadPromptCompare: "Upload your <b>Period 1</b> and <b>Period 2</b> data to see your Instagram connection changes.",
  uploadHintCompare: "Period 1 = Old data | Period 2 = New data",

  // Language toggle
  langEn: "EN",
  langId: "ID",
};

export const id: Translations = {
  // Header
  title: "Analis Pengikut Instagram",
  subtitle: "Analisis siapa yang tidak follow back dan yang saling follow",
  clearData: "Hapus Data",
  clearDataTitle: "Hapus semua data tersimpan (localStorage)",

  // Mode selector
  singleMode: "Mode Tunggal",
  compareMode: "Mode Perbandingan",

  // Period headers
  period1: "📅 Periode 1 (Data Lama)",
  period2: "📅 Periode 2 (Data Baru)",

  // Data card labels
  dataFollowing: "Data Following",
  dataFollowers: "Data Followers",
  period1Following: "Following Periode 1",
  period1Followers: "Followers Periode 1",
  period2Following: "Following Periode 2",
  period2Followers: "Followers Periode 2",

  // Stats (single)
  statFollowing: "Following",
  statFollowers: "Followers",
  statMutuals: "Saling Follow",
  statNotFollowingBack: "Tidak Follow Back",

  // Tabs (single)
  notFollowingBack: "Tidak Follow Back",
  notFollowedBack: "Tidak Kamu Follow Back",
  mutuals: "Saling Follow",

  // Stats (compare)
  statNewFollowers: "Follower Baru",
  statUnfollowers: "Yang Unfollow",
  statNewFollowing: "Following Baru",
  statUnfollowed: "Yang Di-unfollow",

  // Search & sort
  searchPlaceholder: '🔍 Cari username di "{label}"...',
  newest: "Terbaru",
  oldest: "Terlama",
  sortNewestTitle: "Terbaru → Terlama",
  sortOldestTitle: "Terlama → Terbaru",

  // Empty states
  noMatchingUsername: "Tidak ada username yang cocok",
  emptyList: "Daftar kosong",
  noChangesFound: "Tidak ada perubahan",

  // Count
  showingAccounts: "Menampilkan {count} akun",

  // Error
  invalidJson: "Format JSON tidak valid. Periksa kembali data Anda.",

  // DataCard
  detail: "Detail",
  uploadJson: "Upload JSON",
  accountsDetected: "{count} akun terdeteksi",
  latest: "Terbaru:",
  uploadOrDrop: "Upload atau drag & drop file JSON",

  // DropZone
  dropJsonHere: "Lepaskan file JSON di sini",

  // ConfirmModal
  clearAllData: "Hapus Semua Data?",
  clearDataDesc: "Semua data JSON yang tersimpan akan dihapus. Tindakan ini tidak bisa dibatalkan.",
  cancel: "Batal",
  delete: "Hapus",

  // JsonPreviewModal
  rawJson: "Raw JSON",
  close: "Tutup",

  // Empty upload states
  uploadPromptSingle: "Upload data JSON <b>Following</b> dan <b>Followers</b> Instagram untuk mulai analisis.",
  uploadHint: "Data bisa didapat dari fitur Download Data di Instagram",
  uploadPromptCompare: "Upload data <b>Periode 1</b> dan <b>Periode 2</b> untuk melihat perubahan koneksi Instagram Anda.",
  uploadHintCompare: "Periode 1 = Data lama | Periode 2 = Data baru",

  // Language toggle
  langEn: "EN",
  langId: "ID",
};
