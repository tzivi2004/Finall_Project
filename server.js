require('dotenv').config()
const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const mongoose = require('mongoose')
const coonsctDB = require('./config/dbConn')
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


mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
    })
})

mongoose.connection.on('error',err=>{
    console.log(err);
})