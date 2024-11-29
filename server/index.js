// Importing required modules
const express = require("express"); // Express is a Node.js framework for building REST APIs and web applications.
const app = express(); // Initialize the express application.

const cors = require("cors");
const dotenv = require("dotenv"); 
const cookieParser = require("cookie-parser"); 
const userRoutes = require("./routes/User"); 
const database = require("./config/database"); 

// Load environment variables from `.env` file into `process.env`.
dotenv.config();
const PORT = process.env.PORT || 4000;

//db connect
database.connect();

// middlewares 
//  parse JSON data in the request body.
app.use(express.json());

// parse cookies in incoming HTTP requests.
app.use(cookieParser());

//  CORS for requests coming from a specific origin
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Defining routes. with mounting defualt
app.use("/api/v1/auth", userRoutes);


// This route confirms that the server is running.
app.get("/", (req, res) => {
  return res.json({
    success: true, 
    message: "Your server is up and running....", 
  });
});

// Start the server and listen on the defined port.
app.listen(PORT, () => {
  console.log(`APP is running at ${PORT}`);
});
