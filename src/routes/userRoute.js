const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/getUser", userController.getUser);
router.post("/saveUser", userController.saveUser);
router.delete("/deleteUser/:user_id", userController.deleteUser);

module.exports = router;