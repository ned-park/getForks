import bcrypt from "bcrypt"
import express from "express"
const router = express.Router({mergeParams: true})
import User from "../models/User.js"


const userController = {
  signUp: async (req, res) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
  },

  getUsers: async (req, res) => {
    const users = await User.find({})
    res.json(users)
  }
}

export default userController