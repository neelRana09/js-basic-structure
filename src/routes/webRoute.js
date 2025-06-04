const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    try {
        return res.render("index", {
            title: "Web Route",
            message: "Welcome to Home Page"
        })
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

module.exports = router;