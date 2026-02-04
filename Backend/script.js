document.addEventListener("DOMContentLoaded", function () {
    console.log("Portfolio Loaded: Ready for business.");
require('dotenv').config(); // Load the .env file
function openModal(imgSrc) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImg');
    
    modalImg.src = imgSrc; 
    modal.style.display = 'flex';

    // If the image doesn't exist, we show an alert and close the modal
    modalImg.onerror = function() {
        alert("File not found: " + imgSrc + "\nMake sure the file name and extension match exactly!");
        modal.style.display = 'none';
    };
}
  app.post('/api/contact', async (req, res) => {
    // 1. Log what the website is sending you
    console.log("Form Data Received:", req.body);

    const { name, email, message } = req.body;

    // 2. This query MUST match the table columns we created above
    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
    
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error("❌ SQL Query Error:", err.message);
            return res.status(500).json({ error: err.message });
        }
        console.log("✅ Data saved ID:", result.insertId);
        res.status(200).json({ message: "Success!" });
    });
}); 
    
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Prepare the data from form fields
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                // Sending data to your Node.js/MySQL backend
                const response = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    responseMessage.style.color = "#6366f1"; // Matching your Indigo accent
                    responseMessage.innerText = "Thanks, Andrea received your message!";
                    contactForm.reset();
                } else {
                    throw new Error('Server Error');
                }
            } catch (error) {
                console.error("Submission Error:", error);
                responseMessage.style.color = "#ef4444";
                responseMessage.innerText = "Connection error. Is the server running?";
            }
        });
    }
});