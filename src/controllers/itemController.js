const db = require('../models/database');

exports.getItems = (req, res) => {
    db.all('SELECT * FROM items', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error fetching items');
        } else {
            res.render('index', { items: rows });
        }
    });
};

exports.addItem = (req, res) => {
    const { name, description } = req.body;
    const dateCreated = new Date().toISOString();
    db.run('INSERT INTO items (name, description, date_created) VALUES (?, ?, ?)', [name, description, dateCreated], function (err) {
        if (err) {
            res.status(500).send('Error adding item');
        } else {
            res.redirect('/');
        }
    });
};

exports.deleteItem = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).send('Error deleting item');
        } else {
            res.redirect('/');
        }
    });
};

exports.updateItem = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    db.run('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], function (err) {
        if (err) {
            res.status(500).send('Error updating item');
        } else {
            res.redirect('/');
        }
    });
};
