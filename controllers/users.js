import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import express from "express"
const router = express.Router({mergeParams: true})
import User from "../models/User.js"

const createToken = ({username, id}) => jwt.sign({username, id}, process.env.SECRET, { expiresIn: '1d' })

const userController = {
  signUp: async (req, res) => {
    const { username, password } = req.body

    try {
      const savedUser = await User.signup(username, password)
      let userForToken = {
        id: savedUser._id.toString(),
        username: savedUser.username
      }

      const token = createToken(userForToken)

      res
        .status(201)
        .json({ token, user: userForToken })

    } catch(error) {
      if (error.message == 'Username is taken')
        res
          .status(422)
          .json({"error": "Username is taken"})
      else 
        res
          .status(500)
          .json({"error": "Something went wrong"})
      
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body
  
    const user = await User.findOne({ username }, '+password')
    console.log({user})
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.password)
  
    if (!(user && passwordCorrect)) {
      return res
        .status(401)
        .json({
          error: 'invalid username or password'
        })
    }
  
    const userForToken = {
      username: user.username,
      id: user._id,
    }
  
    const token = createToken(userForToken)
  
    res
      .status(200)
      .send({ token, user: userForToken })
  },
  getUsers: async (req, res) => {
    const users = await User.find({})
    res.json(users)
  }
}

export default userController