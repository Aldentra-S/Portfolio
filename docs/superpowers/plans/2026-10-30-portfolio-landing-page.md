# Implementation Plan: Redesign Portfolio Landing Page (Revisi)

**Project:** Personal Portfolio — Aldentra Supranatantra  
**Date:** 30 October 2026  
**Status:** Revised — Awaiting Approval  
**Specification Reference:** `docs/superpowers/specs/2026-10-30-portfolio-landing-page-design.md`  
**Current Git Branch:** `redesign/portfolio-landing-page`

---

## 1. Ikhtisar Rencana & Tujuan

Mengubah arsitektur multi-halaman (`index.html`, `about.html`, `projects.html`, `skills.html`, `contact.html`) menjadi satu **single-page landing page** terpadu di `index.html`.

Proses migrasi mengedepankan keamanan data, preservasi aset, pengujian statis/otomatis terukur (*test-driven verification*), kejujuran data faktual, aksesibilitas penuh, dan strategi rollback aman per batch tanpa mengganggu fungsionalitas yang sudah ada.

### Batasan Kritis & Prinsip Utama:
*   **Vanilla Stack:** Hanya menggunakan HTML5 semantik, CSS3 murni, dan vanilla JavaScript. Tanpa framework, bundler, atau dependensi berbayar.
*   **Preservasi Halaman Lama (No Auto-Deletion):** File `about.html`, `projects.html`, `skills.html`, dan `contact.html` **tidak akan dihapus secara otomatis**. Penghapusan mutlak memerlukan persetujuan eksplisit pengguna setelah landing page selesai dan diverifikasi.
*   **Faktualitas Konten (Anti-Slop C-5, R-17, R-36):** Tidak ada klaim, statistik, tingkat kemampuan, atau pencapaian fiktif. Jika ada data yang meragukan, data tersebut tidak akan ditampilkan dahulu.
*   **Identitas Monogram AL:** Menerapkan monogram AL di seluruh komponen (menggantikan AS), tanpa foto profil.
*   **Standar Aksesibilitas Penuh (WCAG AA):** Memastikan kontras warna minimum 4.5:1, navigasi keyboard penuh, indikator fokus terlihat jelas, struktur heading semantik tanpa loncatan level, label form eksplisit, dan atribut alt gambar deskriptif.
*   **Rollback Aman Granular:** Setiap batch memiliki titik pemulihan spesifik per-file/per-commit tanpa risiko menimpa atau menghapus pekerjaan lain di branch.

---

## 2. Struktur Batch dan Strategi Rollback

Implementasi dibagi menjadi 3 Batch independen dengan titik verifikasi dan prosedur rollback spesifik:

```
┌────────────────────────────────────────────────────────────────────────┐
│ BATCH A: Fondasi & Struktur Dasar                                      │
│ - Fase 1: Audit Git & Safety Net Snapshot                              │
│ - Fase 2: Standarisasi Design Tokens & DESIGN.md                       │
│ - Fase 3: Konstruksi Kerangka Single-Page index.html                   │
│ [Verifikasi Batch A] -> [Titik Rollback A]                             │
├────────────────────────────────────────────────────────────────────────┤
│ BATCH B: Tampilan, Gaya & Interaksi                                    │
│ - Fase 4: Konsolidasi & Modularisasi CSS (global.css)                  │
│ - Fase 5: Optimasi JavaScript (Scrollspy, Filter, Tab, WhatsApp Form)  │
│ [Verifikasi Batch B] -> [Titik Rollback B]                             │
├────────────────────────────────────────────────────────────────────────┤
│ BATCH C: Konten Faktual, Aksesibilitas & Review Akhir                  │
│ - Fase 6: Migrasi Konten Faktual & Preservasi Aset                     │
│ - Fase 7: Verification Suite Otomatis (Aksesibilitas & Statis)         │
│ - Fase 8: Laporan Kesiapan & Menunggu Persetujuan Hapus Manual        │
│ [Verifikasi Batch C] -> [Titik Rollback C]                             │
└────────────────────────────────────────────────────────────────────────┘
```

### Prosedur Rollback Granular:
*   **Rollback Batch A:**
    Jika struktur dasar `index.html` atau `DESIGN.md` bermasalah:
    Kembalikan file secara spesifik dengan `git checkout -- index.html` dan hapus `DESIGN.md`. File halaman lama dan branch tetap 100% aman tanpa `git reset --hard`.
*   **Rollback Batch B:**
    Jika terjadi regresi styling atau script:
    Kembalikan stylesheet dan script ke status Batch A dengan `git checkout -- css/global.css js/script.js`. Struktur markup `index.html` yang sudah valid tidak akan hilang.
*   **Rollback Batch C:**
    Jika konten atau verifikasi aksesibilitas memerlukan perbaikan:
    Perbaiki langsung pada file bersangkutan tanpa mengulang dari Batch A atau B.

---

## 3. Rincian Fase Implementasi

### Fase 1: Audit Kondisi Git dan Pembuatan Safety Net
*   **Tujuan:** Mengunci status awal repositori dan memastikan working tree siap.
*   **Langkah Aksi:**
    1.  Verifikasi branch aktif: `redesign/portfolio-landing-page`.
    2.  Catat commit hash terakhir sebagai referensi dasar pemulihan.
    3.  Pastikan file lama ([about.html](file:///c:/Users/user/Documents/Portfolio/about.html), [projects.html](file:///c:/Users/user/Documents/Portfolio/projects.html), [skills.html](file:///c:/Users/user/Documents/Portfolio/skills.html), [contact.html](file:///c:/Users/user/Documents/Portfolio/contact.html)) berstatus *untouched*.
*   **Verifikasi / Gate:**
    *   Command `git status` mengonfirmasi working tree teridentifikasi.

---

### Fase 2: Standarisasi Design Tokens dan Pembuatan `DESIGN.md`
*   **Tujuan:** Mendokumentasikan identitas visual, token warna, tipografi, dan aturan anti-slop ke dalam `DESIGN.md`.
*   **Langkah Aksi:**
    1.  Buat file `DESIGN.md` di root proyek.
    2.  Dokumentasikan token warna resmi:
        *   `--bg-primary: #070a13` (Dark Graphite)
        *   `--bg-secondary: #0c1222` (Deep Navy)
        *   `--bg-card: rgba(17, 24, 39, 0.7)` (Slate Glass)
        *   `--border-glass: rgba(255, 255, 255, 0.08)`
        *   `--accent-blue: #3b82f6` (Electric Blue)
        *   `--accent-hover: #2563eb`
        *   `--text-primary: #f8fafc` (Rasio kontras > 12:1 terhadap background)
        *   `--text-secondary: #94a3b8` (Rasio kontras > 5.5:1 terhadap background)
        *   `--text-muted: #64748b` (Hanya untuk metadata non-kritis)
    3.  Dokumentasikan tipografi `Montserrat` dengan skala tipe hierarkis.
    4.  Dokumentasikan aturan aksesibilitas (focus indicator outline 2px solid `#3b82f6` dengan offset 2px, larangan `outline: none` tanpa pengganti).
*   **Verifikasi / Gate:**
    *   File `DESIGN.md` tersimpan dan konsisten dengan spesifikasi desain.

---

### Fase 3: Konstruksi Single-Page `index.html` (Struktur & Semantik)
*   **Tujuan:** Membangun kerangka HTML5 semantik landing page di [index.html](file:///c:/Users/user/Documents/Portfolio/index.html).
*   **Langkah Aksi:**
    1.  **Struktur Dokumen:** `<html lang="id">`, `<title>`, meta viewport standar tanpa pembatasan zoom (`user-scalable=yes`), landmark `<header>`, `<nav>`, `<main>`, `<footer>`.
    2.  **Navbar:**
        *   Monogram: `AL` (link ke `#home`).
        *   Anchor links: `#home`, `#about`, `#projects`, `#skills`, `#contact`.
        *   Tombol CTA cepat: *"Hubungi Saya"* (`#contact`).
        *   Hamburger button dengan atribut aksesibilitas `aria-label="Buka menu navigasi"` dan `aria-expanded="false"`.
    3.  **Hero Section (`#home`):**
        *   Heading utama satu-satunya: `<h1>` berisi nama Aldentra Supranatantra dan headline dinamis `#typed-text`.
        *   Monogram visual hero: Monogram **AL** dalam container lingkaran beraksen clean slate/blue.
        *   CTA ganda: *"Lihat Proyek"* (`#projects`) dan *"Hubungi Saya"* (`#contact`).
        *   Statistik faktual terverifikasi: 6+ Proyek Selesai, 7+ Teknologi Utama, 2th Perjalanan Belajar.
        *   *Aturan ketat:* Tidak ada badge atau teks klaim status magang/PKL/freelance.
    4.  **Tech Stack Strip:**
        *   8 badge teknologi nyata: HTML5, CSS3, JavaScript, PHP, React, Node.js, MySQL, Git.
    5.  **About & Journey Section (`#about`):**
        *   Heading: `<h2>`.
        *   Kredensial nyata: Siswa SMK Negeri 1 Ciomas, PPLG Kelas XI, Bogor.
        *   Linimasa nyata: Kelas X (2025-2026: Fondasi Pemrograman Web) dan Kelas XI (2026-Sekarang: Pendalaman Framework & Database).
        *   Chips minat terarah: Web Development, Game Development, UI/UX Design, Kecerdasan Buatan, Mobile Apps, Cloud Computing.
    6.  **Featured Projects Section (`#projects`):**
        *   Heading: `<h2>`.
        *   Filter buttons: `Semua`, `Web App`, `Game`, `Backend` dengan state aksesibel.
        *   *3 Proyek Unggulan:*
            1. Smart Finance (Web Application)
            2. Bookshelf API (REST API / Backend)
            3. Game Tebak Angka 123 (Game Development)
        *   *3 Proyek Tambahan:*
            4. Aplikasi Catatan Pribadi (Web Application)
            5. Aplikasi Pendaftaran Eskul (Web Application - Kolaborasi Tim, repositori `habibtegar`)
            6. Bookshelf App (Web Application - Vanilla JS & localStorage)
    7.  **Skills Section (`#skills`):**
        *   Heading: `<h2>`.
        *   Tab list ber-ARIA: `role="tablist"` dengan tombol tab `role="tab"` dan panel `role="tabpanel"`.
        *   Tingkat kemampuan faktual: Fundamental (HTML, CSS), Intermediate (JS, PHP, MySQL, Git, npm, Postman, Bootstrap), Learning (React, Node.js, Python, Figma, Linux), Daily Use (VS Code, Canva).
    8.  **Contact Section (`#contact`):**
        *   Heading: `<h2>`.
        *   Info kontak: email `supranatantra10@gmail.com`, domisili Bogor, tautan profil GitHub, LinkedIn, Instagram.
        *   Formulir: Seluruh field memiliki pasangan `<label for="...">` eksplisit, pesan bantuan error terasosiasi dengan `aria-describedby`, dan tombol submit yang memicu redirect pesan WhatsApp (`wa.me/6285210157886`).
    9.  **Footer:**
        *   Monogram `AL`, hak cipta dinamis, tautan sosial, dan tombol back-to-top (`aria-label="Kembali ke atas"`).
*   **Verifikasi / Gate (Batch A Gate):**
    *   Validasi struktur HTML: hanya satu `<h1>`, seluruh heading menurun logis (`<h2>` -> `<h3>`), seluruh anchor `#...` memiliki pasangan section dengan `id` yang valid.

---

### Fase 4: Konsolidasi dan Modularisasi CSS
*   **Tujuan:** Menyatukan gaya ke dalam [global.css](file:///c:/Users/user/Documents/Portfolio/css/global.css) dengan pemisahan per-section dan penegakan aksesibilitas.
*   **Langkah Aksi:**
    1.  Satukan CSS dengan struktur scoped dan modular:
        *   Design Tokens & Reset
        *   Aksesibilitas & Focus Rings (`:focus-visible`)
        *   Navbar & Navigasi Mobile
        *   Section Hero & Monogram AL
        *   Section Tech Strip
        *   Section About & Linimasa
        *   Section Projects & Filter Grid
        *   Section Skills & Tab Controls
        *   Section Contact & Form Inputs
        *   Footer & Floating Back-to-Top
        *   Responsive Media Queries (1024px, 768px, 480px)
    2.  Pastikan rasio kontras warna teks terhadap latar belakang lolos standar WCAG AA (min 4.5:1 untuk teks body, min 3:1 untuk teks besar).
    3.  Terapkan focus indicators yang kontras:
        ```css
        :focus-visible {
          outline: 2px solid var(--accent-blue);
          outline-offset: 2px;
        }
        ```
    4.  Pastikan target sentuh (touch target) mobile memenuhi minimum 44px x 44px pada seluruh tombol dan tautan navigasi.
*   **Verifikasi / Gate:**
    *   Pemeriksaan CSS statis memastikan tidak ada sintaks error dan aturan focus state aktif di seluruh kontrol interaktif.

---

### Fase 5: Optimasi JavaScript
*   **Tujuan:** Menyederhanakan [script.js](file:///c:/Users/user/Documents/Portfolio/js/script.js) menjadi pengendali interaksi single-page yang cepat dan bebas error.
*   **Langkah Aksi:**
    1.  **Hapus Jeda Loading:** Hapus delay 1,5 detik artifisial (`setTimeout(..., 1500)`); inisialisasi halaman langsung saat DOM siap.
    2.  **Scrollspy Navigation:** Terapkan `IntersectionObserver` pada setiap `<section id="...">` untuk memperbarui kelas `.active` pada link navbar sesuai posisi scroll pengguna.
    3.  **Navigasi Keyboard Tab:** Dukung navigasi panah kiri/kanan pada tab keahlian sesuai pedoman WAI-ARIA tab pattern.
    4.  **Filter Kategori Proyek:** Filter mulus berdasarkan atribut `data-category`.
    5.  **Validasi & WhatsApp Redirect:**
        *   Validasi client-side: Nama lengkap, email valid, subjek, dan pesan minimal 10 karakter.
        *   Format teks pesan URL-encoded rapi ke nomor `6285210157886`.
        *   Reset form dan feedback status sukses setelah pengiriman.
    6.  **Tahun Hak Cipta Dinamis:** Otomatisasi tahun berjalan di footer.
*   **Verifikasi / Gate (Batch B Gate):**
    *   Eksekusi `node -c js/script.js` sukses tanpa kesalahan parsing JavaScript.

---

### Fase 6: Migrasi Konten Faktual dan Preservasi Aset
*   **Tujuan:** Mengintegrasikan seluruh data proyek, teks, dan aset gambar asli tanpa distorsi.
*   **Langkah Aksi:**
    1.  Gunakan seluruh 6 gambar asli dari `assets/images/` ([gambarproject1.png](file:///c:/Users/user/Documents/Portfolio/assets/images/gambarproject1.png) hingga [gambarproject6.png](file:///c:/Users/user/Documents/Portfolio/assets/images/gambarproject6.png)).
    2.  Sertakan teks `alt` yang deskriptif dan akurat pada setiap gambar proyek (contoh: `alt="Antarmuka aplikasi Smart Finance, grafik pengeluaran bulanan"`).
    3.  Terapkan penamaan jujur:
        *   Proyek 3: *"Game Tebak Angka 123"* (koreksi dari nama lama 2D Platformer).
        *   Proyek 5: Cantumkan atribusi *"Kolaborasi Tim: Repositori habibtegar/Aplikasi_Pendaftaran_Eskul"*.
        *   Proyek 2 vs 6: Jelaskan pembeda fungsional antara arsitektur REST API backend dengan aplikasi web frontend DOM.
*   **Verifikasi / Gate:**
    *   Skrip verifikasi memastikan seluruh 6 gambar fisik ditemukan di disk dan terhubung ke elemen `<img>` yang memiliki `alt` valid.

---

### Fase 7: Verification Suite Otomatis (Aksesibilitas & Statis)
*   **Tujuan:** Menjalankan pengujian otomatis dan statis tanpa bergantung pada browser testing manual.
*   **Langkah Aksi:**
    1.  **Audit Aksesibilitas Markup:**
        *   Memeriksa bahwa seluruh `<img>` memiliki atribut `alt` non-empty dan deskriptif.
        *   Memeriksa bahwa setiap elemen `<input>`, `<select>`, dan `<textarea>` terhubung dengan `<label for="...">`.
        *   Memeriksa hirarki heading: hanya ada satu `<h1>`, dan tidak ada lompatan tingkat (`<h1>` -> `<h3>`).
        *   Memeriksa focus rings: memastikan `:focus-visible` terdefinisi dan tidak ada `outline: none` tanpa pengganti.
        *   Memeriksa rasio kontras warna teks dan elemen UI utama memenuhi WCAG AA.
    2.  **Audit Navigasi & Anchor:**
        *   Memeriksa bahwa semua link `#anchor` navbar dan tombol CTA memetakan elemen dengan `id` yang eksis.
    3.  **Audit Anti-Slop:**
        *   Memeriksa ketiadaan karakter em dash (`—`) pada teks antarmuka di `index.html`.
        *   Memeriksa ketiadaan teks klaim ketersediaan PKL/magang/freelance.
        *   Memverifikasi bahwa monogram `AL` digunakan secara konsisten di Navbar, Hero, dan Footer.
    4.  **Audit Sintaks JavaScript:**
        *   Pemeriksaan parsing Node.js (`node -c js/script.js`).
*   **Verifikasi / Gate (Batch C Gate):**
    *   Skrip verifikasi menghasilkan output `ALL CHECKS PASSED (0 ERRORS)`.

---

### Fase 8: Laporan Kesiapan dan Menunggu Persetujuan Hapus Manual
*   **Tujuan:** Menuntaskan landing page dan menyajikan laporan kesiapan tanpa menghapus file lama secara otomatis.
*   **Langkah Aksi:**
    1.  Tandai file lama ([about.html](file:///c:/Users/user/Documents/Portfolio/about.html), [projects.html](file:///c:/Users/user/Documents/Portfolio/projects.html), [skills.html](file:///c:/Users/user/Documents/Portfolio/skills.html), [contact.html](file:///c:/Users/user/Documents/Portfolio/contact.html)) sebagai **arsip cadangan**.
    2.  **Dilarang keras menghapus file lama secara otomatis.**
    3.  Tampilkan laporan lengkap hasil pengujian kepada Aldentra.
    4.  Penghapusan file lama hanya akan dilakukan jika pengguna memberikan instruksi eksplisit: *"Hapus file lama"*.
*   **Verifikasi / Gate:**
    *   Landing page single-page aktif dan berfungsi penuh di [index.html](file:///c:/Users/user/Documents/Portfolio/index.html). File lama tetap aman di disk.

---

## 4. Matriks Mitigasi Risiko Migrasi

| Risiko Potensial | Tingkat Dampak | Strategi Mitigasi Terencana |
| :--- | :--- | :--- |
| **Penghapusan File Tanpa Sengaja** | Kritis | Penghapusan otomatis ditiadakan. File lama tetap ada sampai persetujuan manual eksplisit diberikan. |
| **Klaim atau Fakta Tidak Akurat** | Tinggi | Hanya fakta yang terverifikasi yang dimasukkan. Informasi yang meragukan disisihkan. |
| **Pelanggaran Aksesibilitas WCAG** | Sedang | Pengujian statis otomatis memeriksa atribut `alt`, relasi `label[for]`, kontras warna, focus rings, dan hirarki heading. |
| **Kerusakan Style / Script antar-Batch** | Sedang | Prosedur rollback granular per-file (`git checkout -- <file>`) diterapkan tanpa menyentuh file lain. |
| **Target Anchor Navigasi Rusak** | Sedang | Validasi otomatis memverifikasi kecocokan antara `href="#id"` dan atribut `id` pada section tujuan. |

---

## 5. Checklist Kesiapan Akhir

- [ ] `DESIGN.md` telah dibuat dan menjadi acuan token visual.
- [ ] `index.html` menyajikan landing page terpadu dengan semantik HTML5 yang bersih.
- [ ] Monogram **AL** diterapkan di Navbar, Hero, dan Footer.
- [ ] 3 Proyek Unggulan dan 3 Proyek Tambahan tampil faktual dengan tautan valid.
- [ ] Atribusi kolaborasi untuk *Aplikasi Pendaftaran Eskul* tertera transparan.
- [ ] Judul *Game Tebak Angka 123* telah dikoreksi.
- [ ] Tidak ada badge/klaim status ketersediaan PKL, magang, atau freelance.
- [ ] Seluruh kontrol form memiliki `<label for="...">` dan terhubung ke WhatsApp.
- [ ] Kontras warna WCAG AA, focus visible, atribut `alt`, dan struktur heading lolos audit aksesibilitas.
- [ ] Verification suite otomatis lulus tanpa error (0 errors).
- [ ] File lama ([about.html](file:///c:/Users/user/Documents/Portfolio/about.html), dll.) tetap tersimpan aman di disk menunggu instruksi pengguna.
