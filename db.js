const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./crm.db", (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        db.run(`
            CREATE TABLE IF NOT EXISTS campaigns (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                description TEXT,
                email TEXT,
                status TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Database initialized");
    }
});

module.exports = db;
