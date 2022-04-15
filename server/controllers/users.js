import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

// SignIn for user 
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User donsen't exists" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credential" });
    }
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      { JWT_SCT },
      { expiresIn: "3h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

// SignUp for user 
const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password don't match." });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      email,
      name: `${firstName} ${lastName}`,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
      },
      { JWT_SCT },
      { expiresIn: "3h" }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).send(error);
  }
};
