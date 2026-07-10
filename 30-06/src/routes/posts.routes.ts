import { Router } from "express"
import { PostController } from "../controllers/PostControllers"
import { authMiddleware } from "../middlewares/authMiddleware"
const router = Router()
const postController = new PostController()


router.get('/', postController.list.bind(postController))
router.get('/myposts', authMiddleware, postController.listMyPosts.bind(postController))
router.get('/:id', postController.list.bind(postController))
router.post('/', postController.create.bind(postController))
router.put('/:id', postController.update.bind(postController))
router.delete('/:id', postController.delete.bind(postController))


export default router