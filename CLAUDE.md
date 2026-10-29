# CLAUDE.md — azka-portfolio

Portfolio pribadi Azka Zufar Hanif — brand **AZH**, domain **azuha.my.id**. Pemilik berkomunikasi dalam **Bahasa Indonesia** — balas dalam Bahasa Indonesia; konten di website tetap **bahasa Inggris**.

Rencana & keputusan desain ada di `PRD.md` (baca dulu sebelum mengubah tampilan/animasi). Tahap 1–5 sudah selesai; tahap 6 (QA) belum.

## Perintah

```bash
npm run dev      # dev server (Turbopack) di http://localhost:3000
npm run build    # production build — TIDAK menjalankan lint (next.config.ts: ignoreDuringBuilds)
npm run lint     # jalankan terpisah; harus "No ESLint warnings or errors"
npx tsc --noEmit -p .   # typecheck
```

Tidak ada test suite. Verifikasi perubahan UI dengan menjalankan app (build + `next start`) dan cek di beberapa lebar layar (360, 390, 768, 1024, 1440) di mode terang & gelap.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 (config di CSS, tidak ada `tailwind.config`) · GSAP 3.14 (ScrollTrigger, SplitText — sudah gratis & termasuk di paket `gsap`) · Lenis (smooth scroll) · react-icons. `framer-motion` masih di `package.json` tapi tidak dipakai di kode.

## Struktur

- `src/app/page.tsx` — beranda: Preloader → Navbar → Hero → About → Service → Tools → Experience → Portfolio → Contact.
- `src/app/portfolio/[slug]/page.tsx` — server: `generateMetadata` (title/description/OG per project), `generateStaticParams` (SSG), JSON-LD; UI-nya di `ProjectDetail.tsx` (client).
- `src/app/sitemap.ts`, `robots.ts` — SEO; sitemap otomatis ikut `src/data/portfolio.ts`. `opengraph-image.jpg` = thumbnail share beranda (statis, JPEG < 300 KB supaya muncul di WhatsApp; gambar utama project juga dijaga < 300 KB). `icon.tsx`/`apple-icon.tsx` = favicon kepala di lingkaran hijau, dari `_assets/profile-head.png`.
- `src/app/layout.tsx` — metadata, script anti-flash tema, font (Poppins + subset Noto Sans JP/KR untuk preloader).
- `src/containers/home/<section>/index.tsx` — tiap section beranda.
- `src/components/` — Navbar, Preloader, ThemeToggle, ScrollEffects, PageTransition + TransitionLink, LenisWrapper, CustomCursor, ProjectPlaceholder, ImageLightbox (viewer gambar di detail project; hero + `gallery` jadi satu urutan). (`Footer/` tidak dipakai.)
- `src/data/*.ts` + `src/types/*.ts` — **sumber konten website** (portfolio, experiences, services, tools). Website publik membaca data statis ini, bukan database.
- `src/lib/theme.ts` — `themeColor(token, alpha)` untuk warna di tween GSAP.
- `src/lib/scroll.ts` — `setScrollLock()` / `isScrollLocked()`.

**Website sepenuhnya statis**: tidak ada database, API route, middleware, maupun env yang dibutuhkan. Area admin, Prisma, login/JWT, dan API kirim email (nodemailer) sudah dihapus dengan sengaja — jangan ditambahkan kembali kecuali diminta. Kontak cukup lewat link WhatsApp & `mailto:`.

## Konvensi penting

### Warna & dark mode
- **Jangan hardcode hex** di komponen. Pakai token: `ink`, `ocean`, `foam`, `mist`, `shell`, `sand`, `accent` (mis. `text-ink`, `bg-foam/85`, `border-ocean/10`). Didefinisikan di `src/app/globals.css` sebagai RGB tuple (`--ink: 27 94 82`) + `@theme inline`.
- Mode gelap = `data-theme="dark"` di `<html>`; token dibalik nilainya, jadi biasanya tidak perlu class `dark:`. Varian `dark:` tersedia (`@custom-variant`) untuk kasus khusus (panel preloader/transisi).
- Bayangan: `rgb(var(--shadow)/0.15)`.
- Warna di tween GSAP: `themeColor("ink")`, dan kembalikan dengan `clearProps` saat hover selesai supaya tidak tertinggal warna tema lama.
- Palet "Ocean Calm" tidak boleh diganti (keputusan pemilik).

### Layout & responsif
- Container: `max-w-6xl mx-auto px-4 md:px-6`; section: `py-20 md:py-28`.
- Heading: ukuran bertingkat (`text-3xl sm:text-4xl md:text-6xl`), `tracking-tight` (jangan `tracking-tighter` — huruf jadi menempel).
- `html` memakai `overflow-x: clip` + `scrollbar-gutter: stable`. Karena itu **mengunci scroll lewat `document.body.style.overflow` TIDAK berfungsi** — gunakan `setScrollLock(true/false)` (juga menghentikan Lenis).
- Section Portfolio: scroll horizontal ter-pin hanya di `min-width: 1024px` (`gsap.matchMedia`); di bawah itu grid vertikal. Hitung lebar pakai `clientWidth`, bukan `window.innerWidth` (bug scroll kanan-kiri sebelumnya).

### Animasi (GSAP)
- Bungkus efek dalam `gsap.matchMedia()` dan sediakan jalur `prefers-reduced-motion`; kembalikan cleanup (`mm.revert()` / `ctx.revert()`).
- Efek global via atribut (dijalankan `ScrollEffects` setelah preloader selesai):
  - `data-split-reveal` — kata naik dari balik baris saat masuk layar.
  - `data-scrub-text` — kata menyala mengikuti scroll.
  - `data-magnetic` — elemen mengikuti kursor (pointer halus saja).
  Jangan pasang `data-split-reveal` di elemen yang sudah punya animasi masuk sendiri (mis. heading About, `.reveal-item`).
- Hero menerima prop `ready` dan baru beranimasi setelah preloader selesai.
- Tailwind v4 `scale-*` memakai properti CSS `scale`, terpisah dari `transform` GSAP — jangan pakai class `scale-y-0` dsb. sebagai state awal tween `scaleX/scaleY`.
- Navbar: progress bar scroll + sembunyi saat scroll ke bawah (tidak saat menu mobile terbuka).
- Navigasi ke detail project lewat `TransitionLink` → `PageTransition` (layar naik dari bawah; animasi masuk menunggu pathname berubah). Seluruh kartu portfolio bisa diklik (link "View Case Study" memakai `after:absolute after:inset-0`).

### Preloader
- Kata "Welcome": Benvenuto → ようこそ → 환영합니다 → Selamat Datang → Bienvenue → Welcome (±2,5 detik). Kunjungan ulang dalam sesi yang sama hanya "Welcome" (`sessionStorage` key `preloader-seen`).
- Kalau menambah bahasa dengan aksara non-Latin, tambahkan karakternya ke parameter `text=` URL Google Fonts di `layout.tsx`.

## Konten

- Email kontak: **creativewithazka@gmail.com**. WhatsApp: `https://wa.me/6282214984819`. Domain: `https://azuha.my.id` (dulu azka.dev — jangan dipakai lagi); brand/logo: **AZH**. URL & identitas situs di `src/lib/site.ts` (dipakai metadata, sitemap, robots, JSON-LD). Branding "Antigravity" sudah dihapus — jangan dipakai lagi.
- Tambah/ubah project di `src/data/portfolio.ts` (urutan array = urutan tampil; project terbaru di depan). Field opsional `role` dan `challenge` mengganti teks default di halaman detail; `features` (list Key Features), `gallery` (`{src, caption}[]`, section Screens) dan `link` (tombol Live Preview — tidak dirender kalau kosong, untuk project internal). `description` boleh multi-paragraf (pisahkan dengan baris kosong). Gambar per project boleh di subfolder, mis. `public/images/portfolio/rbs/`. `image: ""` → otomatis tampil placeholder; `description`/`duration` kosong → "Coming soon".
- Tambah tools di `src/data/tools.ts` (section Tools dirender dari data ini).

## Belum selesai / perlu diisi pemilik

- `public/images/about_parallax.png` masih bertuliskan "ANTIGRAVITY" di dalam gambar.
- Tombol Resume (About) & "View Proof" (Experience) → Google Drive (file harus "Anyone with the link"). Link sosial (Contact + JSON-LD `sameAs`) ada di `SOCIAL_LINKS` di `src/lib/site.ts`.
- Google Search Console: kalau verifikasi pakai meta tag, isi `metadata.verification.google` di `layout.tsx`.
- Tahap 6 PRD: Lighthouse, uji Safari/iOS, hapus `framer-motion` jika memang tidak dipakai.
