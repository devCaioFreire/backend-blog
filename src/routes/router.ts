import postController from '../controllers/post.controller';
import { userController } from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.get('/Register', new userController().Register);
router.post('/Login', new userController().Login);
router.post('/Publish', new postController().Publish);


export { router };

