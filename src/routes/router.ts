import { uploadMiddleware } from '../middleware/upload';
import postController from '../controllers/post.controller';
import { userController } from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.get('/Register', new userController().Register);
router.post('/Login', new userController().Login);
router.post('/Publish', uploadMiddleware.single('image'), new postController().Publish);
router.get('/Posts', new postController().Post);
router.get('/Post/:id', new postController().PostByID);

export { router };

