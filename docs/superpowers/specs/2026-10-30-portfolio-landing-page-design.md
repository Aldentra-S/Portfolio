# Portfolio Landing Page — Design Specification

**Project:** Personal Portfolio — Aldentra Supranatantra  
**Date:** 30 October 2026  
**Status:** Approved by Aldentra Supranatantra  
**Reference:** Approved Draft (30 October 2026)

---

## 1. Tujuan dan Latar Belakang

Redesign website portfolio yang sebelumnya terdiri dari lima halaman terpisah (`index.html`, `about.html`, `projects.html`, `skills.html`, `contact.html`) menjadi satu **single-page landing page** yang profesional, modern, responsif, dan mudah dipahami oleh recruiter maupun calon klien.

Website harus menunjukkan kemampuan teknis melalui proyek nyata, bukan sekadar menampilkan daftar teknologi atau klaim kemampuan.

---

## 2. Target Pengunjung

### Target Utama
*   Recruiter dan engineering lead teknologi.
*   Perusahaan yang mencari siswa SMK PPLG untuk kesempatan magang, PKL, atau posisi junior developer.

### Target Sekunder
*   Calon klien yang membutuhkan jasa pengembangan website mandiri/lepas.

---

## 3. Arah Visual dan Identitas

*   **Tema:** Dark.
*   **Warna Utama:** Dark graphite (`#070a13` / `#0b0f19`) dan deep navy (`#0a1120`).
*   **Aksen:** Electric blue (`#3b82f6` dengan interaksi `#2563eb`).
*   **Identitas Visual:** Monogram **AL**, tanpa foto profil.
*   **Tipografi:** `Montserrat`, mempertahankan identitas tipografi yang sudah digunakan di portofolio sebelumnya.
*   **Gaya:** Minimalis, profesional, tegas, dan berorientasi pada konten.
*   **Anti-Slop:** Hindari desain generik, dekorasi berlebihan, gradient berlebihan, animasi yang tidak berguna, dan elemen visual khas AI-slop (seperti glowing orbs berlebih, kartu seragam tanpa hierarki, badge kapsul template).

### Panduan Desain Terkait
*   **Taste Skill:** Menjaga arah visual, komposisi ruang, kontras, dan kualitas antarmuka modern.
*   **Anti-Slop:** Menjaga desain dan salinan teks (copy) tetap jujur, autentik, dan manusiawi tanpa karakter em dash pada antarmuka.
*   **Impeccable:** Memastikan kualitas implementasi kode, aksesibilitas keyboard dan kontras WCAG AA, serta konsistensi desain sistem.

---

## 4. Pendekatan Teknis yang Dipilih

### Full Single-Page Landing Page
Pendekatan yang dipilih adalah menggabungkan seluruh konten lima halaman ke dalam satu halaman utama yang kohesif.

Teknologi yang dipertahankan:
*   HTML5 semantik.
*   CSS3 murni (modular design tokens).
*   JavaScript vanilla (zero-dependency).
*   Tidak membutuhkan framework atau build system baru (zero-build architecture).

`index.html` menjadi halaman utama. Konten halaman lama dipindahkan secara bertahap dan terstruktur. Halaman lama baru dapat dihapus setelah seluruh migrasi dan verifikasi selesai.

---

## 5. Struktur Landing Page

### A. Navbar
*   Monogram: **AL**.
*   Navigasi Anchor: `#home`, `#about`, `#projects`, `#skills`, `#contact`.
*   Tombol Aksi: CTA cepat menuju `#contact`.
*   Sifat: Sticky navigation dengan tampilan konsisten dan indikator aktif dinamis via Scrollspy.

### B. Hero Section (`#home`)
*   Identitas lengkap: Aldentra Supranatantra.
*   Deskripsi singkat: Siswa SMK PPLG dan Web Developer.
*   Ringkasan nilai atau fokus pengembangan web.
*   Monogram **AL** sebagai elemen visual utama (tanpa placeholder foto avatar generic).
*   CTA: *"Lihat Proyek"* (`#projects`) dan *"Hubungi Saya"* (`#contact`).
*   Batasan: Tidak menampilkan klaim ketersediaan PKL, magang, atau freelance. Statistik hanya ditampilkan apabila angka dan definisinya sudah terverifikasi (6+ Proyek, 7+ Teknologi, 2th Belajar).

### C. Tech Stack Strip
*   Menampilkan teknologi utama yang relevan dengan proyek dan kemampuan nyata yang dimiliki: HTML, CSS, JavaScript, PHP, React, Node.js, MySQL, Git.

### D. About & Journey Section (`#about`)
*   Profil singkat dan fokus pengembangan perangkat lunak.
*   Pendidikan: SMK Negeri 1 Ciomas, konsentrasi PPLG.
*   Linimasa perjalanan belajar:
    *   *2025 - 2026 (Kelas X):* Fondasi Pemrograman Web (HTML, CSS, dasar JavaScript).
    *   *2026 - Sekarang (Kelas XI):* Pendalaman Framework & Database (PHP, Laravel, React, Node.js, MySQL).
*   Minat relevan: Web Development, Game Development, UI/UX Design, Kecerdasan Buatan, Mobile Apps, Cloud Computing.

### E. Featured Projects Section (`#projects`)
Menampilkan proyek dengan filter kategori interaktif (Semua, Web App, Game, Backend).

#### 3 Proyek Unggulan (Featured Primary):
1.  **Smart Finance (Manajemen Keuangan Pribadi):** Web app pencatatan keuangan, analitik grafik, dan konsultasi keuangan (React, Tailwind CSS, Node.js, Express, MySQL).
2.  **Bookshelf API:** Backend RESTful API untuk manajemen koleksi buku dengan operasi CRUD lengkap, validasi data, dan in-memory storage (Node.js, Express, Postman).
3.  **Game Tebak Angka 123:** Game tebak kombinasi angka berbasis web dengan DOM interaktif dan antarmuka responsif (HTML, CSS, JavaScript).

#### 3 Proyek Tambahan (Additional Projects):
4.  **Aplikasi Catatan Pribadi:** Web app catatan dinamis dengan pencarian real-time dan validasi sisa karakter (React, Vite, CSS).
5.  **Aplikasi Pendaftaran Eskul:** Sistem pendaftaran ekskul dengan autentikasi siswa dan dashboard admin (HTML, Tailwind CSS, JS). *Atribusi:* Kolaborasi tim, repositori di bawah `habibtegar`.
6.  **Bookshelf App:** Aplikasi manajemen rak buku berbasis vanilla JavaScript dengan manipulasi DOM dan persistensi `localStorage` (HTML, CSS, JavaScript).

Setiap kartu menampilkan gambar pratinjau asli dari `assets/images/`, nama, kategori, deskripsi singkat, tag teknologi, serta tautan Demo dan Source Code yang valid.

### F. Skills Section (`#skills`)
Menggabungkan kategori melalui sistem tab interaktif yang efisien:
*   **Technical Skills:** HTML, CSS (Fundamental); JavaScript, PHP, MySQL (Intermediate); React, Node.js, Python (Learning).
*   **Tools & Platforms:** VS Code, Canva (Daily Use); Git & GitHub, npm/Yarn, Postman, Bootstrap (Intermediate); Figma, Linux/Terminal (Learning).
*   **Soft Skills:** Problem Solving, Critical Thinking, Teamwork, Communication, Time Management, Adaptability, Creativity, Leadership.

Tingkat kemampuan disajikan secara jujur tanpa melebih-lebihkan.

### G. Contact Section (`#contact`)
*   Informasi email terverifikasi: `supranatantra10@gmail.com`.
*   Lokasi: Bogor, Jawa Barat, Indonesia.
*   Tautan profil: GitHub (`Aldentra-S`), LinkedIn (`aldentra-supranatantra`), Instagram (`@dentra_01`).
*   Formulir Kontak: Nama, Email, Nomor Telepon, Tujuan Kontak, Subjek, Pesan.
*   Integrasi Aksi: Pengiriman otomatis terhubung langsung ke pesan terformat WhatsApp (`wa.me/6285210157886`).
*   Batasan: Tidak menampilkan badge status ketersediaan PKL, magang, atau freelance.

### H. Footer
*   Monogram: **AL**.
*   Nama: Aldentra Supranatantra - SMK PPLG.
*   Navigasi ringkas anchor.
*   Tautan media sosial.
*   Hak Cipta dinamis dengan tahun berjalan.

---

## 6. Pendekatan Implementasi

*   Pertahankan seluruh 6 aset gambar proyek di `assets/images/`.
*   Pertahankan dan rapikan design tokens dari `global.css`.
*   Konsolidasikan CSS agar tidak terjadi benturan antar-section.
*   Gunakan JavaScript murni untuk kebutuhan nyata: Scrollspy navigasi, filter kategori proyek, tab keahlian, dan form redirect WhatsApp.
*   Hapus loading screen buatan dengan penundaan 1,5 detik.
*   Pastikan seluruh navigasi anchor dan tautan eksternal berfungsi sempurna.
*   Terapkan layout responsif untuk mobile, tablet, dan desktop.
*   Jamin semantik HTML, navigasi keyboard (focus indicator), dan kontras warna memenuhi standar WCAG AA.

---

## 7. Tujuan dan Batasan

### Goals
*   Menghasilkan satu landing page yang profesional dan berkinerja tinggi.
*   Memperjelas identitas dan kapabilitas teknis Aldentra.
*   Menonjolkan proyek nyata sebagai bukti utama kemampuan.
*   Memudahkan rekruter menemukan informasi penting dalam waktu singkat.
*   Mempertahankan kesederhanaan stack tanpa build step.

### Non-goals
*   Migrasi ke framework (React, Vue, Astro, Next.js).
*   Membangun server backend baru atau database runtime.
*   Menambahkan autentikasi atau layanan cloud berbayar.
*   Mengubah fungsi demo aplikasi pihak ketiga yang sudah live.

### Anti-goals
*   Membuat klaim pengalaman atau pencapaian yang tidak terbukti.
*   Mengarang statistik, testimoni, atau review fiktif.
*   Menggunakan animasi dan dekorasi berlebihan khas AI-slop.
*   Menghapus informasi penting dari proyek yang sudah ada.

---

## 8. Strategi Migrasi

1.  Periksa kondisi Git dan pastikan working tree bersih sebelum perubahan.
2.  Simpan status awal sebagai safety net yang dapat dipulihkan.
3.  Bangun struktur single-page di `index.html`.
4.  Migrasikan konten dan data proyek dari halaman lama secara bertahap.
5.  Rapikan dan konsolidasikan CSS serta JavaScript.
6.  Lakukan pengujian statis dan otomatis terhadap link, anchor, gambar, form, dan aksesibilitas.
7.  Pertahankan seluruh halaman lama selama masa migrasi.
8.  Hapus halaman lama (`about.html`, `projects.html`, `skills.html`, `contact.html`) hanya setelah diverifikasi penuh dan disetujui.
9.  Lakukan peninjauan akhir perubahan Git.

---

## 9. Tabel Keputusan Desain

| Aspek | Keputusan Final |
| :--- | :--- |
| **Format** | Single-page landing page terpadu |
| **Tema** | Dark theme |
| **Palet Warna** | Dark graphite & deep navy dengan aksen electric blue |
| **Identitas Visual** | Monogram **AL** (menggantikan monogram lama AS) |
| **Foto Profil** | Tidak digunakan (fokus pada monogram dan proyek) |
| **Tech Stack** | Vanilla HTML5, CSS3, JavaScript (zero-build) |
| **Proyek Unggulan** | Smart Finance, Bookshelf API, Game Tebak Angka 123 |
| **Proyek Tambahan** | Aplikasi Catatan Pribadi, Aplikasi Pendaftaran Eskul, Bookshelf App |
| **Status PKL / Magang** | Tidak ditampilkan |
| **Klaim / Statistik** | Hanya menampilkan data yang terverifikasi (6+ Proyek, 7+ Teknologi, 2th Belajar) |
| **Panduan Standar** | Taste Skill, Anti-Slop, Impeccable |

---

## 10. Kriteria Keberhasilan

1.  Seluruh informasi penting dari kelima halaman lama terintegrasi rapi dalam satu halaman.
2.  Tiga proyek unggulan tampil menonjol dengan kartu yang jelas dan informatif.
3.  Seluruh tautan demo, repositori GitHub, kontak email, dan WhatsApp berfungsi 100%.
4.  Tidak ada data fiktif, klaim palsu, atau elemen dekoratif AI-slop.
5.  Navigasi anchor `#home`, `#about`, `#projects`, `#skills`, `#contact` berjalan mulus dengan indikator aktif yang presisi.
6.  Tampilan responsif dan proporsional di perangkat mobile, tablet, dan desktop.
7.  Tidak ada error console JavaScript atau konflik spesifisitas CSS.
8.  Website mempertahankan arsitektur statis tanpa dependensi berbayar atau build tools.

