const express = require("express");
const router = express.Router();
const { validateSchema } = require("../helpers/helper");
const { validateToken } = require("../middleware/tokenValidate");
const { loginSchema } = require("../routes/schema");
const authController = require("../controllers/authController");

router.post("/login", validateSchema(loginSchema), authController.login);
router.get("/logout", validateToken, authController.logout);

module.exports = router;