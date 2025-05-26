require('dotenv').config()
const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const mongoose = require('mongoose')
const coonsctDB = require('./config/dbConn')
const multer = require('multer');
const path = require('path');
// const path = require('path') // ייבוא path
const fs = require('fs');

const app = express()
const PORT = process.env.PORT ||1234

coonsctDB()

app.use(cors(corsOptions))
app.use(express.json())
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// גישה לתמונות מהדפדפן

// מסלול להעלאת תמונה ל-Portion (אפשר להעביר ל-route נפרד)
app.post('/api/Portion/upload-image', upload.array("images[]", 10),(req, res) => {
  if (!req.files) return res.status(400).json({ error: 'No file uploaded' });
  // הנתיב היחסי לתמונה
  const files = req.files.map((file) => ({
    url: `http://localhost:1233/uploads/${file.filename}`, // Construct file URL
  }));
  res.json(files );
});

app.delete('/api/Portion/delete-image', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'No URL provided' });

  // Extract filename from the URL
  const filename = path.basename(url);
  const filePath = path.join(__dirname, 'uploads', filename);
console.log(filePath,filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Delete image error:', err);
      return res.status(404).json({ error: 'File not found or could not be deleted' });
    }
    res.json({ success: true, message: 'File deleted' });
  });
});
app.use('/uploads', express.static('uploads'));

app.use("/api/User",require("./route/RouteUser")) 
app.use("/api/Product",require("./route/RouteProduct"))
app.use("/api/Portion",require("./route/RoutePortion"))
app.use("/api/Order",require("./route/RouteOrder"))
app.use("/api/auth",require("./route/RouteAuth"))

// const uploadFolder = path.join(__dirname, '../image') // נתיב לתיקיית uploads
// app.use('/uploads', express.static(uploadFolder)) // גישה לתמונות דרך '/uploads'


mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
    })
})

mongoose.connection.on('error',err=>{
    console.log(err);
})