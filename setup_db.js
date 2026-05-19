const mysql = require('mysql2/promise');

async function setup() {
  try {
    // Koneksi awal tanpa nama database untuk membuat databasenya dulu
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: ''
    });

    console.log('Koneksi ke MySQL berhasil.');
    
    await connection.query('CREATE DATABASE IF NOT EXISTS db_stok_opname');
    console.log('Database db_stok_opname siap.');
    
    await connection.query('USE db_stok_opname');

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL
      )
    `;
    await connection.query(createTableQuery);
    console.log('Tabel users siap.');

    await connection.query('TRUNCATE TABLE users');

    const insertQuery = `
      INSERT INTO users (name, email, password, role) VALUES
      ('Budi Logistik', 'admin@fti.ac.id', '123456', 'Admin Logistik'),
      ('Pak Pimpinan', 'pimpinan@fti.ac.id', '123456', 'Pimpinan')
    `;
    await connection.query(insertQuery);
    console.log('Data dummy berhasil dimasukkan.');
    
    await connection.end();
    console.log('Setup selesai.');

  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
}

setup();
