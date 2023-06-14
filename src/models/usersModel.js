const dbPool = require("../configs/database");
const bcrypt = require("bcrypt");

const getAlluser = () => {
  const sqlQuery = "SELECT * FROM users";
  return dbPool.execute(sqlQuery);
};

const createUser = async (body) => {
  const { username, password } = body;

  //   check usernam availabality
  const [existingUser] = await dbPool.execute(
    `SELECT username from users WHERE username='${username}'`
  );

  if (existingUser.length > 0) {
    throw new Error("Username already taken");
  }
  //   End check usernam availabality

  //   Hash password
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      throw new Error("Error occurred during password hashing");
    } else {
      const sqlQuery = `INSERT INTO users (username,password) VALUE('${username}','${hash}')`;
      return dbPool.execute(sqlQuery);
    }
  });
  //   End Hash password
};

const updateUsername = async (id, body) => {
  const [existingUser] = await dbPool.execute(
    `SELECT * from users WHERE username = '${body.username}' AND id <> ${id} `
  );

  if (existingUser.length > 0) {
    throw new Error("Username already taken");
  }

  const sqlQuery = `UPDATE users set username='${body.username}' WHERE id = ${id}`;
  return dbPool.execute(sqlQuery);
};

const deleteUser = async (id) => {
  const [existingUser] = await dbPool.execute(
    `SELECT * from users WHERE id =  ${id} `
  );

  if (existingUser.length <= 0) {
    throw new Error("User not found");
  }

  const sqlQuery = `DELETE FROM users WHERE id = ${id}`;
  return dbPool.execute(sqlQuery);
};

const forgotPassword = async (id, body) => {
  const { password } = body;
  const [existingUser] = await dbPool.execute(
    `SELECT * from users WHERE id =  ${id} `
  );

  if (existingUser.length <= 0) {
    throw new Error("User not found");
  }

  //   Hash password
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      throw new Error("Error occurred during password hashing");
    } else {
      const sqlQuery = `UPDATE users set password='${hash}' WHERE id = ${id}`;
      return dbPool.execute(sqlQuery);
    }
  });
  //   End Hash password
};

const loginUser = async (body) => {
  const { username, password } = body;
  const [existingUser] = await dbPool.execute(
    `SELECT * from users WHERE username =  '${username}' `
  );

  if (existingUser.length <= 0) {
    throw new Error("User not found");
  }

  const storedHashedPassword = existingUser[0].password;

  const result = await bcrypt.compare(password, storedHashedPassword);

  if (result) {
    return { message: "Successful login" };
  } else {
    throw new Error("Invalid credentials");
  }
};

module.exports = {
  getAlluser,
  createUser,
  updateUsername,
  deleteUser,
  forgotPassword,
  loginUser,
};
