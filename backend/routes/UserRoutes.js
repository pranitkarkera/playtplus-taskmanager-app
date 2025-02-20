const express = require("express");
const { signup, login, getMe} = require("../controller/UserController");
const { signupValidation, loginValidation } = require("../middleware/AuthValidation");

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get("/me", getMe);

module.exports = router;
