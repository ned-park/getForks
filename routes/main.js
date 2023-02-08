import express from "express"
const router = express.Router({mergeParams: true})
import repoController from "../controllers/repo.js"
// const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', repoController.getIndex)

export default router