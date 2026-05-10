# 📊 Instagram Follow Analyzer

Dashboard visualisasi data Instagram untuk menganalisis hubungan following/followers dan melihat perubahan koneksi dari waktu ke waktu.

## ✨ Fitur

### 🎯 Mode Tunggal
Analisis data Instagram pada satu periode waktu:
- **Tidak Follow Back** - Menampilkan akun yang kamu follow tapi tidak follow balik
- **Tidak Kamu Follow Back** - Menampilkan akun yang follow kamu tapi tidak kamu follow balik
- **Saling Follow** - Menampilkan akun yang saling follow (mutual)
- Statistik lengkap: total following, followers, mutual, dan yang tidak follow back

### 🔄 Mode Perbandingan
Bandingkan dua periode waktu untuk melihat perubahan koneksi:
- **Follower Baru** - Akun yang baru follow kamu (ada di periode 2, tidak ada di periode 1)
- **Yang Unfollow Kamu** - Akun yang unfollow kamu (ada di periode 1, tidak ada di periode 2)
- **Following Baru** - Akun yang baru kamu follow (ada di periode 2, tidak ada di periode 1)
- **Yang Kamu Unfollow** - Akun yang kamu unfollow (ada di periode 1, tidak ada di periode 2)

### 🎨 Fitur Tambahan
- 🔍 Pencarian username real-time
- 📱 Responsive design (mobile-friendly)
- 🎭 Avatar otomatis untuk setiap username
- 🔗 Link langsung ke profil Instagram
- 🌈 Glassmorphism UI dengan animasi gradient
- 📁 Upload file JSON atau paste langsung

## 🚀 Cara Menggunakan

### 1. Download Data Instagram
1. Buka Instagram di browser atau aplikasi
2. Pergi ke **Settings** → **Privacy and Security** → **Download Your Information**
3. Pilih format **JSON** dan request data
4. Tunggu email dari Instagram (biasanya 1-2 hari)
5. Download dan extract file ZIP
6. Cari file:
   - `followers_1.json` (atau `followers.json`) untuk data followers
   - `following.json` untuk data following

### 2. Mode Tunggal
1. Pilih tab **📸 Mode Tunggal**
2. Upload atau paste JSON **Following** di kolom kiri
3. Upload atau paste JSON **Followers** di kolom kanan
4. Lihat hasil analisis di tab yang tersedia

### 3. Mode Perbandingan
1. Pilih tab **🔄 Mode Perbandingan**
2. Upload data **Periode 1** (data lama):
   - Following periode 1
   - Followers periode 1
3. Upload data **Periode 2** (data baru):
   - Following periode 2
   - Followers periode 2
4. Lihat perubahan koneksi di tab yang tersedia

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS 4** - Styling
- **vite-plugin-singlefile** - Single HTML output

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

Output akan berupa single HTML file di folder `dist/`.

### Preview Production Build
```bash
npm run preview
```

## 📝 Format Data JSON

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

### Mode Tunggal
- Membersihkan following list dengan unfollow akun yang tidak follow back
- Melihat siapa saja yang saling follow
- Menemukan akun yang follow kamu tapi belum kamu follow balik

### Mode Perbandingan
- Tracking siapa yang unfollow kamu dalam periode tertentu
- Melihat pertumbuhan followers baru
- Monitoring aktivitas following/unfollowing kamu sendiri
- Analisis perubahan engagement dari waktu ke waktu

## 🔒 Privacy & Security

- ✅ Semua data diproses di browser (client-side)
- ✅ Tidak ada data yang dikirim ke server
- ✅ Tidak ada tracking atau analytics
- ✅ Open source - kamu bisa review kode sendiri

## 📄 License

MIT License - bebas digunakan untuk keperluan pribadi atau komersial.

## 🤝 Contributing

Pull requests are welcome! Untuk perubahan besar, silakan buka issue terlebih dahulu untuk diskusi.

---

Made with ❤️ using React + Vite + Tailwind CSS
