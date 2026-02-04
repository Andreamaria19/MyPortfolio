document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
              
const response = await fetch('https://myportfolio-vfdu.onrender.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});

                if (response.ok) {
                    responseMessage.innerText = "Thanks, Andrea received your message!";
                    contactForm.reset();
                } else {
                    throw new Error('Server Error');
                }
            } catch (error) {
                responseMessage.innerText = "Connection error. Is the server running?";
            }
        });
    }

});
