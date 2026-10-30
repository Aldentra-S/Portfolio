# Design System & Visual Authority

<!-- impeccable:design-schema 1 -->

## 1. Identity & Character

*   **Subject:** Aldentra Supranatantra : Siswa SMK Negeri 1 Ciomas (PPLG) & Web Developer.
*   **Visual Mark:** Monogram **AL** (bold geometric, electric blue accent, no profile photo).
*   **Arah Desain:** Premium Dark Developer Portfolio : Editorial Technical Minimalism.
*   **Target Audience:** Recruiter, engineering lead, penyedia magang/PKL SMK PPLG, dan klien freelance.
*   **Visual Acuan:** Berdasarkan komposisi presisi pada referensi visual (Hero split dengan dual-device preview Smart Finance, 8-card Technology Stack ribbon, 3-column About & Learning Journey, 3-card Featured Projects row, 3-card compact Other Projects, tabbed Skills matrix, dan 2-column Contact & WhatsApp form).

---

## 2. Color Palette & Tokens

```css
:root {
  /* Surfaces */
  --bg-primary: #070a13;         /* Deep Ink background */
  --bg-secondary: #0c1222;       /* Dark Navy section background */
  --bg-surface: #111827;         /* Card surface */
  --bg-surface-elevated: #162033;/* Elevated card surface / device chassis */
  --bg-surface-hover: #1e293b;   /* Hover interaction surface */
  
  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.08); /* Default component border */
  --border-focus: #3b82f6;                    /* Active keyboard focus */
  --border-hover: rgba(59, 130, 246, 0.4);    /* Subtle interactive boundary */

  /* Accents */
  --accent-primary: #3b82f6;     /* Electric Blue - primary interaction */
  --accent-hover: #2563eb;       /* Hover state (WCAG AA 5.2:1 contrast) */
  --accent-active: #1d4ed8;      /* Pressed state */
  --accent-subtle: rgba(59, 130, 246, 0.12); /* Selected tab/tag background */

  /* Typography */
  --text-primary: #f8fafc;       /* Highest emphasis (contrast > 12:1) */
  --text-secondary: #94a3b8;     /* Body & descriptions (contrast > 5.5:1) */
  --text-muted: #64748b;         /* Non-critical metadata only */

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.5);

  /* Transitions */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --ease-standard: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 3. Typography Scale (Montserrat)

*   **Primary Typeface:** `Montserrat`, sans-serif.
*   **Scale:**
    *   Display / Hero H1: `clamp(2.5rem, 5vw, 3.5rem)` | Weight 800 | Leading 1.1 | Tracking -0.02em
    *   Section H2: `clamp(1.75rem, 3.5vw, 2.25rem)` | Weight 700 | Leading 1.25 | Tracking -0.015em
    *   Card H3: `1.25rem` | Weight 700 | Leading 1.3
    *   Subtitle / Lead: `1rem` - `1.125rem` | Weight 400 | Leading 1.6
    *   Body: `0.9375rem` (15px) - `1rem` (16px) | Weight 400 | Leading 1.65
    *   Small / Meta: `0.875rem` (14px) | Weight 500 | Leading 1.5
    *   Micro Tag: `0.75rem` (12px minimum) | Weight 600 | Tracking 0.03em

---

## 4. Layout & Section Arrangement (Exact Reference Mapping)

1.  **Navbar:** Sticky, dark navy background with subtle border, left monogram AL + Aldentra, center links (Home, About, Projects, Skills, Contact), right button `Hubungi Saya ↗`, and responsive mobile drawer.
2.  **Hero:** 2-column split layout.
    *   Left: Eyebrow "Halo, saya", H1 "Aldentra Supranatantra" (2 lines), role "Siswa SMK PPLG · Web Developer", factual bio (SMK Negeri 1 Ciomas, PPLG, Bogor), CTAs ("Lihat Proyek →" & "Hubungi Saya"), and factual stats row (6+ Proyek Selesai, 7+ Teknologi Utama, 2 Tahun Pengalaman Belajar).
    *   Right: Sleek perspective laptop frame + standing smartphone mockup showcasing live Smart Finance application with caption "Smart Finance · Web Application".
3.  **Technology Stack Ribbon:** Horizontal 8-card grid (HTML5, CSS3, JavaScript, PHP, React, Node.js, MySQL, Git) with authentic vector logos and labels.
4.  **About Me & Learning Journey:** 3-column layout.
    *   Col 1 (Tentang Saya): Bio, key attributes with icons (Bogor, SMK Negeri 1 Ciomas, Bahasa), and Fokus Minat tags.
    *   Col 2 (Perjalanan Belajar): Vertical timeline (Kelas X 2025-2026 Fondasi Web, Kelas XI 2026-Sekarang Framework & Database).
    *   Col 3 (Pilar Pengembangan): Card container with 3 architectural principles (Clean Architecture, Accessibility First, Zero-Dependency Performance).
5.  **Featured Projects (Proyek Unggulan):** 3 cards in one row on desktop.
    *   Card 1: Smart Finance (React, Tailwind CSS, Node.js, Express, MySQL) with Live Demo & GitHub.
    *   Card 2: Bookshelf API (Node.js, Express, Postman) with GitHub.
    *   Card 3: Game Tebak Angka 123 (JavaScript, HTML5, CSS3) with Live Demo & GitHub.
6.  **Other Projects (Proyek Lainnya):** 3 horizontal compact cards in one row on desktop.
    *   Card 1: Aplikasi Catatan Pribadi (HTML5, CSS3, JavaScript / React, LocalStorage).
    *   Card 2: Aplikasi Pendaftaran Eskul (HTML, Tailwind CSS, JavaScript) with explicit team attribution (Kolaborasi dengan: habibtegar).
    *   Card 3: Bookshelf App (HTML, CSS, JavaScript, LocalStorage) with clear distinction from Bookshelf API.
7.  **Skills Matrix:** Interactive tabbed interface (Semua, Frontend, Backend, Database, Tools) with honest learning descriptions and WAI-ARIA keyboard navigation.
8.  **Contact Section (Hubungi Saya / Kirim Pesan):** 2-column layout.
    *   Left: Contact info (Email, WhatsApp, Lokasi Bogor) and social media links (GitHub, LinkedIn, Instagram).
    *   Right: Message form (Nama, Email, Subjek, Pesan) with client-side validation and automated WhatsApp redirect.
9.  **Footer:** Monogram AL + Aldentra Supranatantra, nav anchors, dynamic copyright year, and back-to-top button.

---

## 5. Anti-Slop & Quality Constraints

1.  **Zero em dashes (`—`)** anywhere in user-facing copy or comments. Use hyphens, colons, or parentheses.
2.  **No fake stats or claims:** Factual data only.
3.  **No availability badges:** Do not display "Tersedia untuk PKL", "Open to work", or "Available for Internship".
4.  **No generic AI template tells:** No giant circular monogram hero placeholder, no floating blur halos, no gradient text fills.
5.  **Zero-dependency vanilla stack:** Vanilla HTML5, CSS3, and JavaScript only. Preserve all legacy files.
