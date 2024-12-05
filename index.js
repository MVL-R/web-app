const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const db = new sqlite3.Database('./items.db');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    db.all('SELECT * FROM items ORDER BY date_created DESC', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render('index', { items: rows });
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
