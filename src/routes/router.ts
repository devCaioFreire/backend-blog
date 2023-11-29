import { userController } from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.get('/Register',new userController().Register);
router.get('/Login',new userController().Login);

export { router };

