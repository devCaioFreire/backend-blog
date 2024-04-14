import { uploadMiddleware } from '../middleware/upload';
import postController from '../controllers/post.controller';
import { userController } from '../controllers/user.controller';
import { Router } from 'express';


const router = Router();

// GET
router.get('/Posts', new postController().Post);
router.get('/Post/:id', new postController().PostByID);

// POST
router.post('/Login', new userController().Login);
router.post('/Register', new userController().Register);
router.post('/Publish', uploadMiddleware.single('image'), new postController().Publish);

// EDIT
router.put('/Edit/:id', uploadMiddleware.single('image'), new postController().PostPut);

// RECOVERY
router.post('/Recovery', new userController().RecoveryPassword);
router.post('/RecoveryCode', new userController().ConfirmCode);
router.post('/ChangePassword', new userController().ChangePassword);

// DELETE
router.delete('/Delete/:id', new postController().PostDelete);

export { router };

