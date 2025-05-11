const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  verifyOTP,
  getAllUsers,
  createUser,
} = require("../Controllers/userController");

const { protect } = require("../Middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOTP);
router.post("/create-users", protect, createUser);

router.get("/all-users", protect, getAllUsers);

module.exports = router;
