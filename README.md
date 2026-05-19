# SISO — Sistem Informasi Stok Opname

Tugas Besar Pemrograman Web | Universitas Andalas

Aplikasi web berbasis Node.js untuk mengelola proses pendataan dan pemeriksaan fisik stok barang (Stok Opname) di lingkungan kampus Fakultas Teknologi Informasi, dilengkapi autentikasi berbasis sesi dan kontrol akses berbasis role (RBAC).

---

## Anggota & Modul

| Nama | NIM | Modul |
| :--- | :--- | :--- |
| Dinda Nathasya Putri | 2411523032 | Update Fisik Stok & Laporan Daftar Barang |
| Loudysa Azisvi Angelia | 2411523024 | Generate Laporan Stok & List Data Barang |

---

## Tech Stack

| Layer | Teknologi |
| :--- | :--- |
| Runtime | Node.js |
| Framework | Express.js v4 |
| Template Engine | EJS + express-ejs-layouts |
| Database | MySQL (via `mysql2` — raw SQL) |
| Auth | express-session |
| UI/CSS | Custom CSS + Lucide Icons + Basecoat |
| Config | dotenv |

---

## Prasyarat

Pastikan sudah terinstall:
- **Node.js** v18 atau lebih baru
- **MySQL** v8 atau lebih baru (bisa menggunakan XAMPP)

---

## Instalasi & Menjalankan

### 1. Clone / download project

```bash
git clone <url-repo-anda>
cd stok_opname_fti
```

### 2. Install dependencies

```bash
npm install
```

### 3. Buat file `.env`

Buat file `.env` di root project (atau salin dari `.env.example`):

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_stok_opname
SESSION_SECRET=stok_opname_secret_key_123
```

### 4. Siapkan database

Buat database MySQL, lalu import skema tabel:

```sql
CREATE DATABASE db_stok_opname;
USE db_stok_opname;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
);
```

### 5. Tambahkan user ke database

Tambahkan data pengguna awal (dummy) ke dalam database untuk keperluan login:

```sql
INSERT INTO users (name, email, password, role) VALUES
('Andi Saputra', 'admin@fti.ac.id', '123456', 'Admin Logistik'),
('Dr. Budi Santoso', 'pimpinan@fti.ac.id', '123456', 'Pimpinan');
```

*(Catatan: Aplikasi ini menggunakan password teks biasa untuk kemudahan purwarupa. Pada produksi nyata, gunakan `bcrypt`.)*

### 6. Jalankan server

```bash
npm start
# atau
node app.js
```

Aplikasi berjalan di [http://localhost:3000](http://localhost:3000)

---

## Struktur Folder

```text
stok_opname_fti/
├── app.js               # Entry point, konfigurasi Express
├── db.js                # Koneksi pool MySQL
├── .env                 # Environment variables
├── package.json         # Dependency list
├── controllers/         # Logika bisnis (misal: authController.js)
├── middleware/          # Middleware (auth.js untuk proteksi route)
├── routes/              # Definisi endpoint (index.js, auth.js)
├── public/              # File statis
│   └── css/
│       └── style.css    # Styling UI formal corporate
└── views/               # File template EJS
    ├── layout.ejs       # Layout utama UI
    ├── login.ejs        # Halaman autentikasi
    ├── dashboard.ejs    # Dashboard Ringkasan Stok
    └── 403.ejs          # Halaman akses ditolak
```

---

## Route & Hak Akses

| Method | URL | Akses | Keterangan |
| :--- | :--- | :--- | :--- |
| GET | `/login` | Publik | Form login |
| POST | `/login` | Publik | Proses autentikasi |
| GET | `/logout` | Login | Logout & hapus sesi |
| GET | `/dashboard` | Login | Dashboard utama |
| GET | `/data-barang` | Admin Logistik | Master Data Barang |
| GET | `/proses-stok` | Admin Logistik | Pemeriksaan fisik stok opname |
| GET | `/laporan` | Login (Semua) | Modul Laporan Stok |

---

## Role Pengguna

| Role | Akses |
| :--- | :--- |
| **Admin Logistik** | Dashboard, Master Barang, Proses Stok Opname, Laporan |
| **Pimpinan** | Dashboard, Laporan |
