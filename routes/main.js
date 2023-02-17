import express from "express"
const router = express.Router({mergeParams: true})
import repoController from "../controllers/repo.js"
import userController from "../controllers/users.js"
// const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', repoController.getIndex)
router.post('/api/login', userController.login)
router.post('/api/signup', userController.signUp)

export default router