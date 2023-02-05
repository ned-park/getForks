import express from "express"
const router = express.Router()
import homeController from "../controllers/home.js"
// const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.getIndex)

export default router