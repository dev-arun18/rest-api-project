const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
    const fullName = "john_doe";
    const dob = "17091999";
    const user_id = `${fullName}_${dob}`;
    const email = "john@xyz.com";
    const roll_number = "ABCD123";

    let numbers = [];
    let alphabets = [];
    let highest_lowercase_alphabet = [];


    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else {
            alphabets.push(item);
            if (item === item.toLowerCase()) {
                if (highest_lowercase_alphabet.length === 0 || item > highest_lowercase_alphabet[0]) {
                    highest_lowercase_alphabet[0] = item;
                }
            }
        }
    });


    let file_valid = false;
    let file_mime_type = '';
    let file_size_kb = 0;
    if (file_b64) {
        try {
            const fileBuffer = Buffer.from(file_b64, 'base64');
            file_size_kb = fileBuffer.length / 1024;
            file_mime_type = 'application/octet-stream';
            file_valid = true;
        } catch (error) {
            file_valid = false;
        }
    }


    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet,
        file_valid,
        file_mime_type,
        file_size_kb
    });
});


app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
