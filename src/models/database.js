const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./shipping.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, date_created TEXT)");
});

module.exports = db;
