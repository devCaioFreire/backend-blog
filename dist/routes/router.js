"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const upload_1 = require("../middleware/upload");
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const user_controller_1 = require("../controllers/user.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
// GET
router.get('/Posts', new post_controller_1.default().Post);
router.get('/Post/:id', new post_controller_1.default().PostByID);
// POST
router.post('/Login', new user_controller_1.userController().Login);
router.post('/Register', new user_controller_1.userController().Register);
router.post('/Publish', upload_1.uploadMiddleware.single('image'), new post_controller_1.default().Publish);
// EDIT
router.put('/Edit/:id', upload_1.uploadMiddleware.single('image'), new post_controller_1.default().PostPut);
// RECOVERY
router.post('/Recovery', new user_controller_1.userController().RecoveryPassword);
router.post('/RecoveryCode', new user_controller_1.userController().ConfirmCode);
router.post('/ChangePassword', new user_controller_1.userController().ChangePassword);
// DELETE
router.delete('/Delete/:id', new post_controller_1.default().PostDelete);
//# sourceMappingURL=router.js.map