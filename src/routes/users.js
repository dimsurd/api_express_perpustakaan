const express = require("express");
const router = express.Router();
const {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  forgotPassword,
  loginUser,
} = require("../controllers/usersController");

router.post("/login", loginUser);
router.get("/", getAllUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/forgot_password/:id", forgotPassword);

module.exports = router;
