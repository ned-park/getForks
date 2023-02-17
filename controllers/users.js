import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import express from "express"
const router = express.Router({mergeParams: true})
import User from "../models/User.js"


const userController = {
  signUp: async (req, res) => {
    const { username, password } = req.body

    try {
      const exists = await User.findOne({username})

      if (exists) {
        throw new Error("Username is taken")
      }

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const user = new User({
        username,
        password: passwordHash,
      })

      const savedUser = await user.save()

      res.status(201).json(savedUser)
    } catch(error) {
      if (error.message == 'Username is taken')
        res.status(422).json({"error": "Username is taken"})
      else {
        res.status(500).json({"error": "Something went wrong"})
      }
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body
  
    const user = await User.findOne({ username }, 'password')
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.password)
  
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }
  
    const userForToken = {
      username: user.username,
      id: user._id,
    }
  
    const token = jwt.sign(
      userForToken, 
      process.env.SECRET, 
      { expiresIn: 24*60*60 })
  
    res
      .status(200)
      .send({ token, username: user.username, name: user.name })
  },
  getUsers: async (req, res) => {
    const users = await User.find({})
    res.json(users)
  }
}

export default userController