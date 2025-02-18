// Importing necessary modules
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./database/db"); // Ensure db.js file correctly sets up MongoDB connection
const cors = require("cors");
const multiparty = require("connect-multiparty");
const cloudinary = require("cloudinary");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const expressMongoSanitize = require("express-mongo-sanitize");
const expressNoSQLSanitizer = require("express-nosql-sanitizer");
const https = require("https");
const fs = require("fs");
 
// Initialize Express app
const app = express();
 
// Load environment variables from .env file
dotenv.config();
 
// Verify environment variables
console.log("DB_URL:", process.env.DB_URL);
console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("API_KEY:", process.env.API_KEY);
console.log("API_SECRET:", process.env.API_SECRET);
 
// CORS policy setup
const corsPolicy = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsPolicy));
 
// Security Headers
app.use(helmet());
 
// Sanitize incoming requests
app.use(expressMongoSanitize());
app.use(expressNoSQLSanitizer());
 
// Multiparty middleware setup
app.use(multiparty());
 
// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
 
// Connect to MongoDB
connectDB(); //  correctly connects to your MongoDB instance
 
// JSON middleware for handling JSON data
app.use(express.json());
 
// Example routes
app.post("/hello", (req, res) => {
  res.send("Welcome to HELLO API start..");
});
 
// Example test route
app.post("/test", (req, res) => {
  res.send("Hello from express server");
});
 
// User routes
app.use("/api/user", userRoutes);
 
// Product routes
app.use("/api/product", productRoutes);
 

 
// Define port for server to listen on
const PORT = process.env.PORT || 5000;
 
// Start the server
app.listen(PORT, () => {
    console.log(' Server is running on port ${PORT}');
});
 
// const options = {
//   key: fs.readFileSync("key.pem"),
//   cert: fs.readFileSync("cert.pem"),
// };
 
// const PORT = process.env.PORT || 5000;
// https.createServer(options, app).listen(PORT, () => {
//   console.log('HTTPS Server is running on port ${PORT}');
// });