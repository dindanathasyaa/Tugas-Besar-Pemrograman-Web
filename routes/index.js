const express = require('express');
const router = express.Router();
const { isLoggedIn, checkRole } = require('../middleware/auth');

router.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.redirect('/login');
});

// Hanya user yang sudah login yang bisa akses dashboard
router.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('dashboard', {
    nama: req.session.user.name,
    role: req.session.user.role,
  });
});

// Hanya Admin Logistik yang boleh akses Pengecekan Stok (Stok Opname)
router.get('/proses-stok', isLoggedIn, checkRole('Admin Logistik'), (req, res) => {
  res.send('<h1>Modul Proses Stok Opname</h1><p>Akses Admin Logistik berhasil.</p>');
});

// Admin Logistik dan Pimpinan bisa akses Laporan
router.get('/laporan', isLoggedIn, (req, res) => {
  res.send('<h1>Laporan Stok Opname</h1><p>Akses berhasil.</p>');
});

module.exports = router;
