# PRD — Redesign Portfolio AZH (azuha.my.id; dulu azka.dev)

| | |
|---|---|
| **Pemilik** | Azka Zufar Hanif |
| **Tanggal** | 29 Oktober 2026 |
| **Status** | Disetujui (siap implementasi) |
| **Stack** | Next.js 15 (App Router), React 19, Tailwind CSS v4, GSAP 3.14 + ScrollTrigger, Lenis, Framer Motion |

---

## 1. Latar Belakang

Web portfolio saat ini sudah memiliki identitas warna "Ocean Calm" (teal/seafoam) yang ingin dipertahankan, serta beberapa animasi GSAP (preloader counter, horizontal scroll portfolio, custom cursor, page transition). Namun ada beberapa masalah:

- Tampilan terasa padat; perlu dibuat **lebih rapi dan minimalis**.
- **Mobile view belum optimal** — contoh: navbar memakai `hidden md:flex` sehingga menu tidak muncul sama sekali di mobile, dan horizontal-scroll portfolio yang di-pin kurang nyaman di layar sentuh.
- Belum ada **dark mode**. Warna saat ini di-hardcode langsung di class Tailwind (±300 kemunculan hex seperti `#1B5E52`, `#2E8B77`, `#E8F4F0`), sehingga sulit dibuat tema.
- Email kontak masih `azkazhanif@gmail.com`.
- Preloader masih menampilkan teks "ANTIGRAVITY" dan counter angka, belum ada sapaan "Welcome".
- Ada 3 project baru yang belum tercantum.

## 2. Tujuan

1. Tampilan bersih, minimalis, dan konsisten di semua ukuran layar (mobile-first).
2. Dark mode yang tetap memakai palet warna yang sama.
3. Animasi lebih interaktif dan halus, terinspirasi dari [GSAP Showcase](https://gsap.com/showcase/).
4. Konten terbaru: email baru dan 3 project baru.

### Non-Goals
- Tidak mengganti palet warna utama.
- Tidak mengubah backend (API contact, Prisma, admin, login).
- Tidak menulis deskripsi/gambar project baru (akan diisi sendiri oleh pemilik).

---

## 3. Ruang Lingkup & Requirement

### 3.1 Desain Minimalis & Rapi

| ID | Requirement | Prioritas |
|---|---|---|
| D-1 | Terapkan sistem spacing konsisten (mis. section padding `py-24 md:py-32`, container `max-w-6xl px-4 md:px-6`). | P0 |
| D-2 | Kurangi elemen dekoratif yang tidak perlu (noise, garis, badge berlebih); maksimal 1 aksen visual per section. | P0 |
| D-3 | Hierarki tipografi jelas: maksimal 3 ukuran heading + 1 ukuran body. Kurangi penggunaan `uppercase` + `letter-spacing` lebar pada teks panjang agar mudah dibaca. | P0 |
| D-4 | Whitespace lebih lega antar section; `section-divider` dipakai seperlunya. | P1 |
| D-5 | Samakan gaya komponen berulang (kartu service, tools, experience, portfolio) — radius, border, hover state seragam. | P1 |
| D-6 | Hapus branding "Antigravity": di preloader diganti sapaan "Welcome" multi-bahasa (lihat 3.5); di metadata (`title`, `openGraph.title`, `siteName`, `keywords`) diganti nama pribadi, mis. "Azka Zufar Hanif \| Full Stack Developer & Designer". Domain tetap `https://azka.dev`. | P1 |

### 3.2 Responsif & Mobile View

| ID | Requirement | Prioritas |
|---|---|---|
| R-1 | **Mobile navigation**: tombol hamburger di `< md` yang membuka menu fullscreen/overlay dengan animasi GSAP (stagger link), tombol close, dan auto-close saat link diklik. | P0 |
| R-2 | Breakpoint yang diuji: 360px, 390px, 768px, 1024px, 1440px. Tidak ada horizontal scroll pada halaman di semua breakpoint. | P0 |
| R-3 | Section Portfolio: horizontal pinned scroll **hanya di desktop** (`gsap.matchMedia()`), di mobile berubah menjadi daftar vertikal / swipe carousel. | P0 |
| R-4 | Custom cursor & efek hover hanya aktif di perangkat `(hover: hover) and (pointer: fine)` (sudah sebagian ada), dan efek hover-image portfolio dinonaktifkan di touch device. | P0 |
| R-5 | Ukuran teks fluid dengan `clamp()` untuk heading hero agar tidak terpotong di layar kecil. | P1 |
| R-6 | Target sentuh minimal 44×44px untuk tombol & link. | P1 |
| R-7 | Halaman detail `/portfolio/[slug]` juga responsif (gambar, tag teknologi wrap rapi). | P1 |
| R-8 | Gambar memakai `next/image` dengan `sizes` yang tepat untuk performa mobile. | P2 |

### 3.3 Dark Mode

| ID | Requirement | Prioritas |
|---|---|---|
| T-1 | Refactor warna hardcode ke **design token** CSS variable di `globals.css` (Tailwind v4 `@theme`), mis. `--color-bg`, `--color-surface`, `--color-primary`, `--color-text`, `--color-muted`, `--color-accent`. Komponen memakai `bg-bg`, `text-primary`, dll. | P0 |
| T-2 | Palet tetap Ocean Calm. Usulan pemetaan: | P0 |
| T-3 | Toggle dark/light di navbar (ikon matahari/bulan) + tersedia di menu mobile. | P0 |
| T-4 | Default mengikuti `prefers-color-scheme`; pilihan user disimpan di `localStorage`. | P0 |
| T-5 | Tidak ada flash tema salah saat load (script inline di `<head>` yang set `data-theme` sebelum render). | P0 |
| T-6 | Transisi tema halus (mis. 300ms pada background/color) atau efek reveal circular dari posisi tombol toggle. | P2 |
| T-7 | Kontras teks memenuhi WCAG AA (≥ 4.5:1) di kedua tema. | P1 |

Token yang diterapkan (T-2) — didefinisikan di `src/app/globals.css` sebagai RGB tuple, dipakai via class `text-ink`, `bg-foam/85`, dll., dan via `themeColor()` (`src/lib/theme.ts`) untuk tween GSAP:

| Token | Peran | Light | Dark |
|---|---|---|---|
| `ink` | Heading, tombol utama | `#1B5E52` | `#E8F4F0` |
| `ocean` | Body text, hover | `#2E8B77` | `#8FD3C3` |
| `foam` | Background | `#E8F4F0` | `#0E1F1C` |
| `mist` | Surface/kartu | `#D0EDE6` | `#16302B` |
| `shell` | Border/aksen lembut | `#B2E0D5` | `#24463F` |
| `sand` | Kartu hangat | `#E8DCCA` | `#1E2A26` |
| `accent` | Aksen | `#5BBFAA` | `#5BBFAA` |
| `shadow` | Warna bayangan | `#1B5E52` | `#000000` |

### 3.4 Update Konten

| ID | Requirement | Prioritas |
|---|---|---|
| C-1 | Ganti email menjadi **`creativewithazka@gmail.com`** di `src/containers/home/contact/index.tsx` (`emailStr`) dan semua tempat lain yang menampilkan email (footer, metadata jika ada). | P0 |
| C-2 | Pastikan env `EMAIL_USER` untuk form kontak (`/api/contact`) diarahkan/diforward ke email baru (konfigurasi deploy, bukan kode). | P1 |
| C-3 | Tambah 3 project baru di `src/data/portfolio.ts` dengan placeholder: | P0 |

Data project baru (C-3) — deskripsi, teknologi, durasi, dan gambar akan diisi pemilik:

| id | title | slug | image (placeholder) |
|---|---|---|---|
| 7 | Room Booking System | `room-booking-system` | `/images/portfolio/RoomBooking.png` |
| 8 | FraudLens | `fraudlens` | `/images/portfolio/FraudLens.png` |
| 9 | Saldoin | `saldoin` | `/images/portfolio/Saldoin.png` |

- Selama gambar belum ada, tampilkan **placeholder** (blok warna `--color-surface` + judul project) agar tidak broken image.
- `description` boleh kosong sementara; halaman detail menampilkan teks "Coming soon" jika kosong.
- Urutan tampilan: **3 project baru ditaruh paling depan** (Room Booking System, FraudLens, Saldoin), diikuti project lama.

### 3.5 Preloader "Welcome" Multi-Bahasa

| ID | Requirement | Prioritas |
|---|---|---|
| P-1 | Ganti counter angka dan teks "ANTIGRAVITY" dengan kata "Welcome" yang berganti cepat dalam 6 bahasa, urutan: **Benvenuto (Italia) → ようこそ (Jepang) → 환영합니다 (Korea) → Selamat Datang (Indonesia) → Bienvenue (Prancis) → Welcome (Inggris)**. Kata terakhir "Welcome" ditahan sebelum exit. | P0 |
| P-2 | Setiap kata tampil ±150–200ms dengan transisi (fade/slide-up mask); kata pertama dan terakhir tampil sedikit lebih lama. Total durasi preloader ≤ 2.5 detik. | P0 |
| P-3 | Exit animation: panel naik ke atas dengan bentuk melengkung (SVG path morph / curve) atau split panel yang ada, lalu konten hero masuk. | P0 |
| P-4 | Preloader hanya tampil penuh pada kunjungan pertama per sesi (`sessionStorage`); kunjungan berikutnya versi singkat atau dilewati. | P1 |
| P-5 | Font mendukung karakter Jepang & Korea (fallback system font atau Noto Sans JP/KR subset hanya untuk karakter yang dipakai) agar tidak muncul kotak kosong. | P0 |
| P-6 | Mengikuti tema aktif (light/dark). | P1 |
| P-7 | Hormati `prefers-reduced-motion`: tampilkan langsung "Welcome" lalu fade out. | P1 |

### 3.6 Animasi & Interaktivitas (Referensi GSAP Showcase)

Prinsip: animasi **mendukung konten, bukan mengganggu**; halus (60fps), dan tetap minimalis.

| ID | Animasi | Section | Prioritas |
|---|---|---|---|
| A-1 | **Text reveal per kata/huruf** (SplitText — kini gratis di GSAP 3.13+) untuk heading saat masuk viewport. | Semua heading | P0 |
| A-2 | **Hero**: nama muncul dengan mask reveal, foto dengan clip-path reveal + parallax ringan saat scroll. | Hero | P0 |
| A-3 | **Magnetic button** — tombol CTA ("Let's Talk", "Send") sedikit mengikuti kursor. | Navbar, Contact | P1 |
| A-4 | **About**: paragraf highlight kata demi kata mengikuti scroll (scrub opacity). | About | P1 |
| A-5 | **Service/Tools**: kartu muncul dengan stagger; tools berupa marquee infinite yang melambat/berbalik arah saat hover/scroll. | Service, Tools | P1 |
| A-6 | **Experience**: timeline dengan garis progres yang terisi mengikuti scroll. | Experience | P1 |
| A-7 | **Portfolio**: hover image preview mengikuti kursor (sudah ada, dirapikan) + gambar scale/parallax di dalam kartu; di mobile diganti fade-in sederhana. | Portfolio | P0 |
| A-8 | **Page transition** antar halaman home ↔ detail project yang konsisten dengan exit animation preloader. | Global | P1 |
| A-9 | **Scroll progress** tipis di atas halaman. | Global | P2 |
| A-10 | Navbar auto-hide saat scroll ke bawah, muncul saat scroll ke atas. | Navbar | P2 |

Aturan teknis animasi:
- Gunakan `@gsap/react` `useGSAP()` untuk cleanup otomatis (hindari memory leak/double animation di React Strict Mode).
- Gunakan `gsap.matchMedia()` untuk membedakan desktop/mobile dan `prefers-reduced-motion`.
- Hanya animasikan `transform` dan `opacity`.
- Pertimbangkan menghapus Framer Motion jika semua animasi sudah via GSAP (mengurangi bundle).

---

## 4. Requirement Non-Fungsional

| Aspek | Target |
|---|---|
| Performa | Lighthouse mobile Performance ≥ 85, LCP < 2.5s, CLS < 0.1 |
| Aksesibilitas | Lighthouse Accessibility ≥ 95; navigasi keyboard berfungsi; fokus terlihat |
| Kompatibilitas | Chrome, Safari (iOS), Firefox, Edge versi terbaru |
| SEO | Metadata diperbarui (title, description, OG image) |

## 5. Rencana Implementasi (Bertahap)

| Fase | Isi | Output |
|---|---|---|
| 1 ✅ | Design token + dark mode + toggle (T-1 s.d. T-5) | Semua komponen memakai token, tema bisa diganti |
| 2 ✅ | Layout minimalis + responsif + mobile nav (D-*, R-*) | Tampilan rapi di semua breakpoint |
| 3 ✅ | Konten: email baru + 3 project placeholder (C-*) | Data terbaru |
| 4 ✅ | Preloader multi-bahasa (P-*) | Preloader baru |
| 5 ✅ | Animasi interaktif (A-*) | Animasi section |
| 6 | QA: responsif, Lighthouse, reduced-motion, kedua tema | Siap deploy |

## 6. Kriteria Penerimaan

- [ ] Menu bisa diakses di mobile (360px) dan tidak ada horizontal overflow.
- [ ] Toggle dark mode berfungsi, tersimpan, dan tidak ada flash tema saat reload.
- [ ] Tidak ada lagi hex warna hardcode di komponen (semua via token).
- [ ] Email `creativewithazka@gmail.com` tampil dan link `mailto:` benar.
- [ ] Room Booking System, FraudLens, dan Saldoin tampil di list & punya halaman detail (`/portfolio/room-booking-system`, `/portfolio/fraudlens`, `/portfolio/saldoin`) tanpa error meski deskripsi/gambar belum ada.
- [ ] Preloader menampilkan "Welcome" dalam 6 bahasa (Italia, Jepang, Korea, Indonesia, Prancis, Inggris), ≤ 2.5 detik, karakter Jepang/Korea tampil benar.
- [ ] Tidak ada lagi teks "Antigravity" di preloader maupun metadata.
- [ ] 3 project baru tampil paling depan di section Portfolio.
- [ ] Animasi berjalan halus di desktop dan disederhanakan di mobile / reduced-motion.
- [ ] `npm run build` dan `npm run lint` lolos tanpa error.

## 7. Keputusan

| # | Topik | Keputusan |
|---|---|---|
| 1 | Branding "ANTIGRAVITY" | Di preloader diganti "Welcome" multi-bahasa; di metadata diganti nama pribadi |
| 2 | Domain | `https://azuha.my.id` (diganti dari azka.dev) |
| 3 | Urutan project | 3 project baru paling depan |
| 4 | Bahasa preloader | Inggris, Italia, Jepang, Korea + Indonesia & Prancis |
| 5 | Nomor WhatsApp "Let's Talk" | Tetap sama |
