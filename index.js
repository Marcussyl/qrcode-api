const express = require('express');
const QRCode = require('qrcode');
const app = express();

// Function to generate a random string
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to generate and save QR code
async function generateAndSaveQRCode() {
    try {
        // Generate 10-character random text
        const randomText = generateRandomString(10);

        // Generate QR Code with the random text
        const qrCodeDataUrl = await QRCode.toDataURL(randomText);

        return { qrCodeDataUrl, randomText };
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// Express route to generate QR code
app.get('/api/generate-qr', async(req, res) => {
    try {
        const { qrCodeDataUrl, randomText } = await generateAndSaveQRCode();
        res.json({ qrCodeDataUrl, randomText });
    } catch (err) {
        res.status(500).send('Error generating QR code');
    }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});