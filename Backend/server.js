const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: 'https://myportfolio-vfdu.onrender.com' 
}));
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 4000,
    ssl: {
        rejectUnauthorized: false // This allows the connection via Render's certificate
    }
});

db.connect(err => {
    if (err) console.error("Database connection failed:", err.stack);
    else console.log("Connected to Database");
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Success!" });
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);

});
