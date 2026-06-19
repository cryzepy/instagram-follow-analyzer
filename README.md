# 📊 Instagram Follow Analyzer

A client-side dashboard to analyze Instagram following/follower relationships and track connection changes over time. All data is processed locally in your browser — nothing is sent to any server.

## ✨ Features

### 🎯 Single Mode
Analyze Instagram data at a single point in time:
- **Not Following Back** — Accounts you follow who don't follow you back
- **Not Followed Back** — Accounts who follow you but you don't follow back
- **Mutuals** — Accounts that follow each other
- Full statistics: total following, followers, mutuals, and not following back

### 🔄 Compare Mode
Compare two time periods to see connection changes:
- **New Followers** — Accounts that followed you (present in period 2, absent in period 1)
- **Unfollowers** — Accounts that unfollowed you (present in period 1, absent in period 2)
- **New Following** — Accounts you started following
- **Unfollowed** — Accounts you unfollowed

### 🎨 Additional Features
- 🔍 Real-time username search
- 🆕 Sort by newest/oldest (by follow timestamp)
- 🖱️ Drag & drop JSON file upload
- 🌐 Multi-language support (English & Indonesian) with auto-detect browser language
- 🏳️ SVG flag icons (inline, no emoji dependency)
- 📅 Dynamic date format (en-US / id-ID) based on selected language
- 📱 Responsive design with hamburger menu (mobile-friendly)
- 🖼️ Profile photos from Instagram (with SVG fallback on error)
- 🔗 Direct link to Instagram profiles
- 💾 Data persistence via localStorage (survives page refresh)
- 🌈 Glassmorphism UI with animated gradient
- 📁 Upload JSON or drag & drop files
- 🗑️ Clear all saved data with confirmation modal

## 🚀 How to Use

### 1. Download Your Instagram Data
1. Open Instagram in your browser or app
2. Go to **Settings** → **Privacy and Security** → **Download Your Information**
3. Select **JSON** format and request your data
4. Wait for the email from Instagram (usually 1-2 days)
5. Download and extract the ZIP file
6. Locate these files:
   - `followers_1.json` (or `followers.json`) for followers data
   - `following.json` for following data

### 2. Single Mode
1. Select the **📸 Single Mode** tab
2. Upload or drop your **Following** JSON data
3. Upload or drop your **Followers** JSON data
4. Browse the results in the available tabs

### 3. Compare Mode
1. Select the **🔄 Compare Mode** tab
2. Upload **Period 1** (older data):
   - Period 1 Following JSON
   - Period 1 Followers JSON
3. Upload **Period 2** (newer data):
   - Period 2 Following JSON
   - Period 2 Followers JSON
4. See your connection changes in the available tabs

## 🛠️ Tech Stack

- **React 19** — UI library
- **TypeScript** — Type safety
- **Vite** — Build tool & dev server
- **Tailwind CSS 4** — Styling
- **vite-plugin-singlefile** — Single HTML output

## 📁 Project Structure

```
src/
├── assets/
│   └── icons/
│       └── logo.svg              # App logo/icon
├── types/
│   └── index.ts              # Shared TypeScript types & interfaces
├── utils/
│   ├── cn.ts                 # Tailwind class merge utility
│   ├── parse.ts              # Instagram JSON parsing helpers
│   └── format.ts             # Date formatting utility
├── hooks/
│   └── useLocalStorage.ts    # localStorage persistence hook
├── contexts/
│   └── LangContext.tsx        # Language provider & useLang hook
├── translations/
│   └── index.ts              # English & Indonesian translations
├── components/
│   ├── AvatarImg.tsx         # Profile photo with SVG fallback
│   ├── ConfirmModal.tsx      # Clear data confirmation modal
│   ├── DataCard.tsx          # Data upload area preview card
│   ├── DropZone.tsx          # Drag & drop file upload wrapper
│   ├── JsonPreviewModal.tsx  # Raw JSON preview modal
│   ├── Navbar.tsx            # Sticky navbar with logo, lang toggle, hamburger
│   ├── StatCard.tsx          # Statistics display card
│   └── UserCard.tsx          # User avatar + username card
├── contexts/
│   └── LangContext.tsx        # Language provider & useLang hook
├── translations/
│   └── index.ts              # English & Indonesian translations
├── index.css                 # Global styles & glassmorphism
├── main.tsx                  # App entry point
├── vite-env.d.ts             # Vite & SVG type declarations
└── App.tsx                   # Main app logic & layout
```

## 💻 Development

### Install Dependencies
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

Output will be a single HTML file in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

## 📝 JSON Data Format

### Following
```json
{
  "relationships_following": [
    {
      "title": "username",
      "string_list_data": [
        {
          "href": "https://instagram.com/username",
          "timestamp": 1234567890
        }
      ]
    }
  ]
}
```

### Followers
```json
[
  {
    "string_list_data": [
      {
        "href": "https://instagram.com/username",
        "value": "username",
        "timestamp": 1234567890
      }
    ]
  }
]
```

## 🎯 Use Cases

### Single Mode
- Clean up your following list by unfollowing accounts that don't follow back
- See who follows you that you haven't followed back
- Discover your mutual connections

### Compare Mode
- Track who unfollowed you over a specific period
- Monitor new follower growth
- Analyze your own following/unfollowing activity
- Track engagement changes over time

## 🔒 Privacy & Security

- ✅ All data is processed client-side in your browser
- ✅ No data is sent to any server
- ✅ No tracking or analytics
- ✅ Open source — you can review the code yourself

## 📄 License

MIT License — free for personal or commercial use.

---

Made with ❤️ using React + Vite + Tailwind CSS
