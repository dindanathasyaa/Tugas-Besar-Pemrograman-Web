const mysql = require('mysql2/promise');

async function updateDb() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'db_stok_opname'
  });
  
  await connection.query('UPDATE users SET name = ? WHERE role = ?', ['Andi Saputra', 'Admin Logistik']);
  await connection.query('UPDATE users SET name = ? WHERE role = ?', ['Dr. Budi Santoso', 'Pimpinan']);
  
  console.log('Database updated');
  await connection.end();
}
updateDb();
