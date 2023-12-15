import { uploadMiddleware } from '../middleware/upload';
import postController from '../controllers/post.controller';
import { userController } from '../controllers/user.controller';
import { Router } from 'express';


const router = Router();

// GET
router.get('/Register', new userController().Register);
router.get('/Posts', new postController().Post);
router.get('/Post/:id', new postController().PostByID);

// POST
router.post('/Login', new userController().Login);
router.post('/Publish', uploadMiddleware.single('image'), new postController().Publish);

// EDIT
router.put('/Edit/:id',uploadMiddleware.single('image'), new postController().PostPut);

// DELETE
router.delete('/Delete/:id', new postController().PostDelete);

export { router };

