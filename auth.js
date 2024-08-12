const fs = require("fs");
const crypto = require("crypto");

const loadUsers = () => {
  try {
    const dataBuffer = fs.readFileSync("users.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveUsers = (users) => {
  const dataJSON = JSON.stringify(users);
  fs.writeFileSync("users.json", dataJSON);
};

const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

const register = (username, password) => {
  const users = loadUsers();
  const duplicateUser = users.find((user) => user.username === username);

  if (!duplicateUser) {
    const hashedPassword = hashPassword(password);
    users.push({ username, password: hashedPassword });
    saveUsers(users);
    return "User registered successfully!";
  } else {
    return "Username is already taken!";
  }
};

const login = (username, password) => {
  const users = loadUsers();
  const hashedPassword = hashPassword(password);
  const user = users.find(
    (user) => user.username === username && user.password === hashedPassword
  );

  if (user) {
    return "Login successful!";
  } else {
    return "Invalid username or password!";
  }
};

module.exports = {
  register,
  login,
};
