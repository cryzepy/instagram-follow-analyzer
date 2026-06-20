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

  // Tutorial
  tutorialTitle: string;
  tutorialBtn: string;
  tutorialStep1Title: string;
  tutorialStep1Desc: string;
  tutorialStep1_1: string;
  tutorialStep1_2: string;
  tutorialStep1_3: string;
  tutorialStep1_4: string;
  tutorialStep1_5: string;
  tutorialStep2Title: string;
  tutorialStep2Desc: string;
  tutorialStep2_1: string;
  tutorialStep2_2: string;
  tutorialStep2_3: string;
  tutorialStep3Title: string;
  tutorialStep3Desc: string;
  tutorialStep3_single: string;
  tutorialStep3_compare: string;
  tutorialStep4Title: string;
  tutorialStep4Desc: string;
  tutorialStep4_1: string;
  tutorialStep4_2: string;
  tutorialStep4_3: string;
  tutorialFooter: string;
  tutorialBack: string;
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
  period1: "Period 1 (Old Data)",
  period2: "Period 2 (New Data)",

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
  searchPlaceholder: 'Search username in "{label}"...',
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

  // Tutorial
  tutorialTitle: "How to Use Instagram Follow Analyzer",
  tutorialBtn: "How to Use",
  tutorialStep1Title: "1. Download Your Instagram Data",
  tutorialStep1Desc: "Request your data from Instagram's built-in download feature:",
  tutorialStep1_1: "Open Instagram → Settings → Privacy and Security → Download Your Information",
  tutorialStep1_2: "Select JSON format and request your data",
  tutorialStep1_3: "Wait for the email from Instagram (usually 1-2 days)",
  tutorialStep1_4: "Download and extract the ZIP file",
  tutorialStep1_5: "Look for followers_1.json (or followers.json) and following.json",
  tutorialStep2Title: "2. Upload Your Data",
  tutorialStep2Desc: "You can upload in two ways:",
  tutorialStep2_1: 'Click the "Upload JSON" button and select your file',
  tutorialStep2_2: "Drag & drop a .json file directly onto the upload area",
  tutorialStep2_3: "Or paste the raw JSON content into the text area",
  tutorialStep3Title: "3. Choose Your Mode",
  tutorialStep3Desc: "This app has two analysis modes:",
  tutorialStep3_single: "Single Mode - Analyze your current following/followers relationship. See who doesn't follow back, who you haven't followed back, and mutuals.",
  tutorialStep3_compare: "Compare Mode - Compare two time periods to track new followers, unfollowers, new following, and unfollowed accounts.",
  tutorialStep4Title: "4. Explore the Results",
  tutorialStep4Desc: "Once your data is loaded:",
  tutorialStep4_1: "Browse accounts using the category tabs (Not Following Back, Mutuals, etc.)",
  tutorialStep4_2: "Use the search bar to find specific usernames",
  tutorialStep4_3: "Sort by newest or oldest using the sort toggle",
  tutorialFooter: "All data is processed locally in your browser. Nothing is sent to any server.",
  tutorialBack: "Back to App",
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
  period1: "Periode 1 (Data Lama)",
  period2: "Periode 2 (Data Baru)",

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
  searchPlaceholder: 'Cari username di "{label}"...',
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

  // Tutorial
  tutorialTitle: "Cara Menggunakan Analis Pengikut Instagram",
  tutorialBtn: "Panduan",
  tutorialStep1Title: "1. Download Data Instagram",
  tutorialStep1Desc: "Minta data kamu dari fitur download Instagram:",
  tutorialStep1_1: "Buka Instagram → Settings → Privacy and Security → Download Your Information",
  tutorialStep1_2: "Pilih format JSON dan minta data kamu",
  tutorialStep1_3: "Tunggu email dari Instagram (biasanya 1-2 hari)",
  tutorialStep1_4: "Download dan extract file ZIP",
  tutorialStep1_5: "Cari file followers_1.json (atau followers.json) dan following.json",
  tutorialStep2Title: "2. Upload Data",
  tutorialStep2Desc: "Kamu bisa upload dengan dua cara:",
  tutorialStep2_1: 'Klik tombol "Upload JSON" dan pilih file kamu',
  tutorialStep2_2: "Drag & drop file .json langsung ke area upload",
  tutorialStep2_3: "Atau paste konten JSON mentah ke area teks",
  tutorialStep3Title: "3. Pilih Mode",
  tutorialStep3Desc: "Aplikasi ini punya dua mode analisis:",
  tutorialStep3_single: "Mode Tunggal - Analisis hubungan following/followers saat ini. Lihat siapa yang tidak follow back, yang tidak kamu follow back, dan saling follow.",
  tutorialStep3_compare: "Mode Perbandingan - Bandingkan dua periode untuk melacak follower baru, yang unfollow, following baru, dan yang di-unfollow.",
  tutorialStep4Title: "4. Jelajahi Hasil",
  tutorialStep4Desc: "Setelah data dimuat:",
  tutorialStep4_1: "Jelajahi akun menggunakan tab kategori (Tidak Follow Back, Saling Follow, dll.)",
  tutorialStep4_2: "Gunakan kolom pencarian untuk mencari username tertentu",
  tutorialStep4_3: "Urutkan dari terbaru atau terlama menggunakan tombol sortir",
  tutorialFooter: "Semua data diproses di browser kamu. Tidak ada data yang dikirim ke server.",
  tutorialBack: "Kembali ke Aplikasi",
};
