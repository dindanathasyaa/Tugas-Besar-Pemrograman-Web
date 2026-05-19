const db = require('../db');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.render('login', { layout: false, error: null });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.render('login', { layout: false, error: 'Email atau password salah.' });
    }

    const user = rows[0];
    
    // Asumsikan password belum di-hash di db untuk prototype sederhana (menyamakan pola dari teman)
    // Jika pakai bcrypt:
    // const match = await bcrypt.compare(password, user.password);
    
    const match = (password === user.password); // <-- Bisa diganti bcrypt jika db sudah tersimpan hash

    if (!match) {
      return res.render('login', { layout: false, error: 'Email atau password salah.' });
    }

    // Cek Role khusus untuk Stok Opname
    if (user.role !== 'Admin Logistik' && user.role !== 'Pimpinan') {
      return res.render('login', { layout: false, error: 'Akses ditolak. Role tidak dikenali.' });
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
    };

    res.redirect('/dashboard');

  } catch (err) {
    console.error('Login error:', err);
    res.render('login', { layout: false, error: 'Terjadi kesalahan pada server.' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/login');
  });
};
