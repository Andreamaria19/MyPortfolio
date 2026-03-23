const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());

let db;

if (process.env.DB_HOST) {
    db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

    db.connect(err => {
        if (err) {
            console.error("DB Connection Failed:", err.message);
        } else {
            console.log(" Connected to MySQL Database");
        }
    });
} else {
    console.log(" No DB config found, skipping DB connection (CI mode)");
}


app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // If DB not available (CI), just respond success
    if (!db) {
        console.log("Received (no DB):", req.body);
        return res.status(200).json({ message: "Received (no DB mode)" });
    }

    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error(" SQL Error:", err.message);
            return res.status(500).json({ error: err.message });
        }

        console.log("Data saved ID:", result.insertId);
        res.status(200).json({ message: "Success!" });
    });
});


app.get('/', (req, res) => {
    res.send("Server is running ");
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});