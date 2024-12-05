const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./src/routes/authRoutes');
const postRoutes = require('./src/routes/postRoutes');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(session({
  secret: 'reddit-secret',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static('public'));

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/posts', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login.html');
  }
  res.sendFile(path.join(__dirname, 'public', 'posts.html'));
});

app.get('/', (req, res) => {
  res.send('Welcome! Please go to <a href="/login.html">Login</a> to access the site.');
});

app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
