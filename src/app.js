// Importing Modules
const express = require("express");
const userRouter = require("./routes/userRoute");
const webRouter = require("./routes/webRoute");
const authRoute = require("./routes/authRoute");
const path = require("path");
const app = express();

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRouter);
app.use("/api", webRouter);
app.use("/api/auth", authRoute);

// Error Handler
app.use(function (err, req, res, next) {
    if (err.status == 404) {
        return res.status(404).json({ message: err.message });
    }

    return res.status(err.status || 500).json({ message: err.message });
});

module.exports = { app };