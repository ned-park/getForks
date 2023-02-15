import express from "express"
const router = express.Router({mergeParams: true})
import userController from "../controllers/users.js"
// const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', userController.getUsers)
router.post('/signup', userController.signUp)

export default router