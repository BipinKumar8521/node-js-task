const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Users = [];

// Signup controller
const signup = async (req, res) => {
  // Get user data from request body
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = Users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the hashed password
    const newUser = {
      username,
      password: hashedPassword,
    };

    // Add the new user to the Users array
    Users.push(newUser);

    // Generate JWT token
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);

    // Return the token to the client
    res.status(201).json({ message: "User created", token });
  } catch (error) {
    // Handle any error that occurred during password hashing
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login controller
const login = async (req, res) => {
  // Get user data from request body
  const { username, password } = req.body;

  // Find the user in the Users array
  const user = Users.find((user) => user.username === username);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  try {
    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);

    // Return the token to the client
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    // Handle any error that occurred during password comparison
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
};
