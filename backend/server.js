const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const userRoutes = require("./routes/UserRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const path = require("path");

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

// Error Handler
app.use(errorHandler);

app.use("/api/user", userRoutes);
app.use("/api/resume", resumeRoutes);

// -----------DEPLOYMENT-----------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running successfully");
  });
}

// -----------DEPLOYMENT-----------

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Listening on http://localhost:${PORT}`));
