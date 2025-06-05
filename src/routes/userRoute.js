const express = require("express");
const router = express.Router();
const { validateSchema } = require("../helpers/helper");
const { validateToken } = require("../middleware/tokenValidate");
const { saveUserSchema } = require("../routes/schema");
const userController = require("../controllers/userController");

router.get("/getUser", validateToken, userController.getUser);
router.post("/saveUser", validateSchema(saveUserSchema), userController.saveUser);
router.put("/updateUser", validateToken, validateSchema(saveUserSchema), userController.updateUser);
router.delete("/deleteUser/:user_id", validateToken, userController.deleteUser);

module.exports = router;