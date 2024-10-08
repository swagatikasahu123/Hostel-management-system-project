// import express from "express";
// import userRoutes from "./routes/userRoutes.js";
// import studentRoutes from "./routes/studentRoutes.js";
// import attendanceRoutes from "./routes/attendanceRoutes.js";
// import path from "path";
// import morgan from "morgan";
// const path =require('path')
// import dotenv from "dotenv";
// import connectDB from "./config/mongoDBConfig.js";
// import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
// dotenv.config();
// connectDB();
// const app = express();

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use("/users", userRoutes);
// app.use("/student", studentRoutes);
// app.use("/attendance", attendanceRoutes);

// const __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running....");
//   });
// }
// app.use(errorHandler);
// app.use(notFound);

// //static files
// app.use(express.static(path.join(__dirname,"./frontend/build")))

// app.get("*",function(req,res){
//   res.sendFile(path.join(__dirname,"./frontend/build/index.html"))
// })

// const PORT = process.env.PORT || 5000;

// app.listen(
//   PORT,
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
// );
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/mongoDBConfig.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

// Define __dirname for ES modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// Use morgan in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/users", userRoutes);
app.use("/student", studentRoutes);
app.use("/attendance", attendanceRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

