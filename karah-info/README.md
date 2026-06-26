# 🏘️ RW 6 Karah — Website Profil Wilayah

Website resmi RW 6 Karah, Kelurahan Karah, Kecamatan Jambangan, Kota Surabaya.

Dibuat menggunakan **Next.js 15**, **Tailwind CSS**, **Recharts**, dan **React Leaflet**.

---

## 🚀 Fitur

- **Beranda** – Hero section, statistik wilayah, quick menu, tentang RW, peta mini, UMKM unggulan
- **Profil RW** – Dashboard statistik lengkap dengan grafik (Recharts)
- **Profil RT** – Card data per RT (1–7)
- **UMKM** – Grid card dengan search, filter RT, pagination; data dari Google Sheets
- **Peta Wilayah** – Leaflet interaktif dengan marker UMKM dan filter RT
- **SEO** – Metadata, Open Graph, sitemap.xml, robots.txt
- **ISR** – Data UMKM di-refresh otomatis setiap 1 jam

---

## 📁 Struktur Folder

```
karah-info/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Beranda
│   ├── profil-rw/
│   │   ├── page.tsx
│   │   └── ProfilRWClient.tsx
│   ├── profil-rt/
│   │   └── page.tsx
│   ├── umkm/
│   │   ├── page.tsx
│   │   └── UMKMClient.tsx
│   ├── peta-wilayah/
│   │   ├── page.tsx
│   │   └── PetaClient.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   └── MapPreview.tsx
│   └── ui/
│       ├── UMKMCard.tsx
│       └── StatCard.tsx
├── data/
│   ├── profil-rw.json
│   ├── rt.json
│   └── umkm-dummy.json     # Fallback jika Google Sheets tidak tersedia
├── lib/
│   ├── googleSheets.ts     # Integrasi Google Sheets API
│   └── utils.ts
├── .env.example
└── tailwind.config.ts
```

---

## ⚙️ Setup Lokal

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/karah-info.git
cd karah-info
npm install
```

### 2. Konfigurasi Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
GOOGLE_SHEET_ID=1vxNza2MNdZ4foJtoHgfKjT8GlKOnbEXy_oF_X8O2_eY
GOOGLE_API_KEY=your_key_here
```

> **Tanpa env vars**: website tetap jalan menggunakan data dummy dari `/data/umkm-dummy.json`

### 3. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## 🔑 Setup Google Sheets API

1. Buka [Google Cloud Console](https://console.cloud.google.com)
2. Buat project baru atau pilih yang sudah ada
3. Enable **Google Sheets API**
4. Buat **API Key** di menu "Credentials"
5. Batasi API Key ke "Google Sheets API" (opsional tapi disarankan)
6. Isi `GOOGLE_API_KEY` di `.env.local`

### Format Spreadsheet

Kolom di Google Sheets (mulai baris 2):

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| id | nama_umkm | pemilik | rt | alamat | deskripsi | whatsapp | maps | foto | kategori |

Pastikan spreadsheet **dapat dilihat oleh siapa saja** (Share → Anyone with the link → Viewer).

---

## 🚢 Deploy ke Vercel

### Cara 1: Melalui Vercel Dashboard

1. Push code ke GitHub
2. Buka [vercel.com](https://vercel.com) → Import Project
3. Pilih repository `karah-info`
4. Di bagian **Environment Variables**, tambahkan:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_API_KEY`
5. Klik **Deploy**

### Cara 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
# Ikuti prompt
vercel env add GOOGLE_SHEET_ID
vercel env add GOOGLE_API_KEY
vercel --prod
```

---

## 🛠️ Teknologi

| Teknologi | Versi | Kegunaan |
|-----------|-------|---------|
| Next.js | 15 | Framework utama (App Router) |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3.4 | Styling |
| Recharts | 2.x | Grafik statistik |
| React Leaflet | 4.x | Peta interaktif |
| Framer Motion | 11.x | Animasi |
| Lucide React | 0.4x | Ikon |

---

## 📝 Kustomisasi Data

### Profil RW
Edit `/data/profil-rw.json` untuk mengubah data statistik RW.

### Data RT
Edit `/data/rt.json` untuk mengubah data per RT.

### UMKM
- **Online**: Isi data di Google Spreadsheet → otomatis tampil di website
- **Offline**: Edit `/data/umkm-dummy.json` sebagai fallback

---

## 👩‍💻 Dibuat oleh

KKN UIN Sunan Ampel Surabaya  
Kelompok RW 6 Karah, Kelurahan Karah, Kecamatan Jambangan, Kota Surabaya

---

## 📄 Lisensi

MIT License — bebas digunakan untuk keperluan non-komersial.
## fyvgrfy
