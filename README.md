# Portofolio Web & Layanan Interaktif — Minggu 3

**Nama:** Rotua Immanuela Tampubolon
**NIM:** 12S24028
**Kelas:** 13SI
**Mata Kuliah:** Pemrograman dan Pengujian Web (12S3101)

## Ringkasan Pembaruan
Merefactor proyek Personal Portfolio & Service Portal dari Minggu 2 (HTML5 + CSS murni) menjadi berstandar Bootstrap 5.3, dengan tambahan navbar responsif, hero section, grid kartu proyek + modal detail, formulir floating labels dengan validasi visual, dan custom CSS variables untuk theming.

## Live Demo
[isi link GitHub Pages di sini]

## Sebelum vs Sesudah Integrasi Framework

| Aspek | Minggu 2 (Sebelum) | Minggu 3 (Sesudah) |
|---|---|---|
| Layout | CSS Grid & Flexbox manual | Bootstrap Grid 12-kolom (`row-cols`) |
| Navigasi | Nav statis tanpa toggle mobile | Navbar `sticky-top` + hamburger collapse |
| Hero Section | Tidak ada | Hero section dengan CTA ganda |
| Portofolio | Tabel semantik statis | Grid kartu proyek + Modal detail (4 kartu) |
| Formulir | Input HTML5 polos | Floating Labels, Input Group berikon, validasi visual Bootstrap |
| Styling | 8 CSS variables custom | 12 CSS variables, override tanpa `!important` |
| Ikon | Tidak ada | Bootstrap Icons |

## Screenshot
https://rotuatampubolon.github.io/ppw-2026-week2-12S24028/ 

## Struktur File
```
.
├── index.html
├── custom-style.css
└── README.md
```
