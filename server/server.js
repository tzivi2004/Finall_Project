require('dotenv').config()
const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const mongoose = require('mongoose')
const coonsctDB = require('./config/dbConn')
const multer = require('multer');
const path = require('path');
// const path = require('path') // ייבוא path

const app = express()
const PORT = process.env.PORT ||1234

coonsctDB()

app.use(cors(corsOptions))
app.use(express.json())

app.use("/api/User",require("./route/RouteUser")) 
app.use("/api/Product",require("./route/RouteProduct"))
app.use("/api/Portion",require("./route/RoutePortion"))
app.use("/api/Order",require("./route/RouteOrder"))
app.use("/api/auth",require("./route/RouteAuth"))

// const uploadFolder = path.join(__dirname, '../image') // נתיב לתיקיית uploads
// app.use('/uploads', express.static(uploadFolder)) // גישה לתמונות דרך '/uploads'

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
app.use('/uploads', express.static('uploads'));

// מסלול להעלאת תמונה ל-Portion (אפשר להעביר ל-route נפרד)
app.post('/api/Portion/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  // הנתיב היחסי לתמונה
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});


mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
    })
})

mongoose.connection.on('error',err=>{
    console.log(err);
})