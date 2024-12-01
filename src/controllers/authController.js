const db = require('./database');
const bcrypt = require('bcrypt');

exports.registerUser = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
    if (err) return res.status(500).json({ error: 'Username already exists' });
    res.json({ message: 'User registered successfully' });
  });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    req.session.user = user;
    res.json({ message: 'Login successful' });
  });
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out successfully' });
  });
};
