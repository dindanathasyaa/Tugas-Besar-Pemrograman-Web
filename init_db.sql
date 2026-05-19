CREATE DATABASE IF NOT EXISTS db_stok_opname;
USE db_stok_opname;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
);

-- Hapus data dummy sebelumnya jika ada
TRUNCATE TABLE users;

-- Masukkan data dummy (password plain text sesuai controller)
INSERT INTO users (name, email, password, role) VALUES
('Budi Logistik', 'admin@fti.ac.id', '123456', 'Admin Logistik'),
('Pak Pimpinan', 'pimpinan@fti.ac.id', '123456', 'Pimpinan');
