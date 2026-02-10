const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path'); // ADDED THIS
require('dotenv').config();

const app = express();

// 1. Updated CORS: Allows your Render URL and local testing
app.use(cors()); 

app.use(express.json());

// 2. SERVE FRONTEND FILES: This tells the app where your HTML/CSS/JS are
// It looks up one folder from 'Backend' to find your main files
app.use(express.static(path.join(__dirname, '../')));

const db = mysql.createConnection({
    host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
    user: "34Z7u7R6aGsvz2W.root", 
    password: "41izUCOXmZOuB21L",
    database: "myportfolio",
    port: 4000,
    ssl: {
        rejectUnauthorized: false
    }
});
db.connect(err => {
    if (err) {
        // This will print the username to the logs so we can see if it's actually working
        console.error("❌ Connection failed for user:", process.env.DB_USER);
        console.error("❌ Error Message:", err.message);
    } else {
        console.log("✅ SUCCESS! Connected as:", process.env.DB_USER);
    }
});

// 3. HOME ROUTE: This serves your website when you visit the main link
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    const sql = "INSERT INTO myportfolio.messages (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Success!" });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});








