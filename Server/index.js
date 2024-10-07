const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./db/connectDB.js');
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


// Cloudinary Setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    apis_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

// database connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // To parse JSON data in the request body
app.use(express.urlencoded({ extended: true })); // To parse form daat in the request body
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});