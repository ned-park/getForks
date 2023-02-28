import express from "express"
const router = express.Router({mergeParams: true})
import repoController from "../controllers/repo.js"
import { requireAuth } from "../middleware/requireAuth.js"
import { upload } from "../middleware/multer.js"

router.use(requireAuth)

router.get('/', repoController.getUserRepos)
router.get('/:repoId', repoController.getRepo)
router.post('/create', upload.single("file"), repoController.createNewRepo)
router.delete('/:repoId', repoController.deleteRecipe)

export default router