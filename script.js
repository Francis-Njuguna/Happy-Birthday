document.addEventListener('DOMContentLoaded', () => {
    const messagePhone = document.getElementById('message-phone');
    const birthdayMessage = document.getElementById('birthday-message');
    const sendMessageButton = document.getElementById('send-message');

    // Your WhatsApp number (replace with your actual number)
    const YOUR_WHATSAPP_NUMBER = '254705764209'; // Format: 254XXXXXXXXX

    // Start date: January 29, 2005
    const startDate = new Date('2005-29-01T00:00:00');
    // End date: April 29, 2025
    const endDate = new Date('2025-04-29T00:00:00');
    let hasCelebrated = false;

    // Start the stopwatch
    updateStopwatch();
    setInterval(updateStopwatch, 1000);

    sendMessageButton.addEventListener('click', async () => {
        const message = birthdayMessage.value.trim();
        const phone = messagePhone.value;

        if (!message) {
            alert('Please write a birthday message');
            return;
        }

        if (!phone || !/^[0-9]{9}$/.test(phone)) {
            alert('Please enter a valid phone number (9 digits after 254)');
            return;
        }

        try {
            sendMessageButton.disabled = true;
            sendMessageButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            await sendWhatsAppMessage(message, phone);
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Message error:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            sendMessageButton.disabled = false;
            sendMessageButton.innerHTML = '<i class="fab fa-whatsapp"></i> Send via WhatsApp';
        }
    });

    async function sendWhatsAppMessage(message, senderPhone) {
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(
            `🎂 New Birthday Message 🎂\n\n` +
            `From: ${senderPhone}\n` +
            `Message: ${message}\n\n` +
            `Sent via Birthday Website`
        );

        // Create WhatsApp API URL
        const whatsappUrl = `https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${encodedMessage}`;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
    }

    function updateStopwatch() {
        const now = new Date();
        let difference = endDate - now;

        // If we've reached the end date, set difference to 0
        if (difference <= 0) {
            difference = 0;
            if (!hasCelebrated) {
                celebrate();
                hasCelebrated = true;
            }
        }

        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('years').textContent = years.toString().padStart(2, '0');
        document.getElementById('months').textContent = months.toString().padStart(2, '0');
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    function celebrate() {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // Create confetti from multiple points
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.3, 0.7), y: Math.random() - 0.2 }
            });
        }, 250);

        // Add a special burst of confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
});

function copyNumber() {
    navigator.clipboard.writeText('0705764209')
        .then(() => {
            const button = document.querySelector('.copy-button');
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-copy"></i> Copy';
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy number. Please try manually.');
        });
}