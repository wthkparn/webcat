const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ระบุตำแหน่งของไฟล์ HTML
const HTML_FILE = path.join(__dirname, 'index.html');

// ใช้ Express เพื่อเรียกใช้ไฟล์ HTML
app.use(express.static(path.join(__dirname, 'public')));

// สร้าง middleware เพื่อเก็บ log
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}: ${req.method} ${req.url}`);
    next();
});

// เรียกใช้ไฟล์ HTML
app.get('/', (req, res) => {
    // อ่านไฟล์ HTML
    fs.readFile(HTML_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(`เกิดข้อผิดพลาดในการอ่านไฟล์ HTML: ${err}`);
            res.status(500).send('500 Internal Server Error');
        } else {
            // ส่งเนื้อหา HTML กลับไปยัง client
            res.status(200).send(data);
        }
    });
});

// เริ่มต้น HTTP server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});