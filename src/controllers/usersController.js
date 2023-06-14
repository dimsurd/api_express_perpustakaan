const usersModel = require("../models/usersModel");

const getAllUser = async (req, res) => {
  try {
    const [data] = await usersModel.getAlluser();

    res.status(200).json({
      message: "Get all user success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Get all user failed",
      error: err,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { body } = req;
    await usersModel.createUser(body);

    res.status(201).json({
      message: "Create user success",
      data: body,
    });
  } catch (err) {
    res.status(500).json({
      message: "Create user failed",
      error: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    await usersModel.updateUsername(id, req.body);

    res.status(201).json({
      message: "Update user success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Update user failed",
      error: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await usersModel.deleteUser(req.params.id);

    res.status(200).json({
      message: "Delete user success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Delete user failed",
      error: err.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { id } = req.params;
    await usersModel.forgotPassword(id, req.body);

    res.status(201).json({
      message: "Password Changed",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Password change failed",
      error: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    await usersModel.loginUser(req.body, res);

    res.status(200).json({
      message: "Login success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  forgotPassword,
  loginUser,
};
