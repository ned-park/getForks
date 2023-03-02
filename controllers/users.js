import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
const router = express.Router({ mergeParams: true });
import User from "../models/User.js";

const createToken = ({ id, username }) =>
  jwt.sign({ username, id }, process.env.SECRET, { expiresIn: "1d" });

const userController = {
  signUp: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.signup(username, password);
      const token = createToken(user);

      res.status(201).json({ token, user });
    } catch (error) {
      console.error(error);
      if (error.message == "Username is taken") {
        res.status(422).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.login(username, password);
      const token = createToken(user);

      res.status(200).send({ token, user: user });
    } catch (error) {
      console.error(error.message);
      if (error.message.includes("Invalid")) {
        return res.status(401).json({
          message: error.message,
        });
      } else {
        return res.status(500).json({
          message: error.message,
        });
      }
    }
  },
  getUsers: async (req, res) => {
    const users = await User.find({});
    res.json(users);
  },
};

export default userController;
