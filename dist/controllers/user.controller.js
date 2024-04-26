"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = __importDefault(require("../services/user.service"));
const prisma_1 = require("../prisma");
const recovery_password_1 = require("../utils/recovery-password");
const html_email_recovery_1 = require("../utils/html-email-recovery");
const generate_otp_1 = require("../utils/generate-otp");
class userController {
    async Register(req, res) {
        const user = { ...req.body };
        const Service = new user_service_1.default();
        const userRegistered = await Service.Create(user);
        res.status(201).json(userRegistered);
    }
    ;
    async Login(req, res) {
        const { email, password } = req.body;
        const user = await prisma_1.prisma.user.findFirst({ where: { email } });
        try {
            if (!user) {
                console.log('User not found');
            }
            const passwordMatch = await bcrypt_1.default.compare(password, user.password);
            if (passwordMatch) {
                const token = (0, jsonwebtoken_1.sign)({ id: user.id, name: user.name, email: user.email }, process.env.JWT_TOKEN, { expiresIn: '24h' });
                res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                res.json({ user, token });
            }
            else {
                console.log('Senha incorreta');
                res.status(401).json({ error: 'Senha incorreta' });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    ;
    async RecoveryPassword(req, res) {
        try {
            const { email } = req.body;
            const verificationCode = (0, generate_otp_1.generateOTP)();
            const cookie = email + "|" + verificationCode;
            const hash = bcrypt_1.default.hashSync(cookie, 12);
            const html = (0, html_email_recovery_1.HTML_RECOVERY_EMAIL)(Number(verificationCode));
            const info = await recovery_password_1.transporter.sendMail({
                from: `"Personal Assistent by Caio Freire" <${process.env.USER_FROM_MAIL}}>`,
                to: email,
                subject: "Recovery Password",
                text: "Copy the code below and paste it into the blog to recover your password.",
                html: html
            });
            const expires = new Date(new Date().getTime() + 24 * 60 * 1000);
            res.cookie("code", hash, { expires, httpOnly: true, secure: true });
            return res.json(info);
        }
        catch (error) {
            console.log(error);
        }
    }
    ;
    async ConfirmCode(req, res) {
        try {
            const { code } = req.body;
            const header = req.headers.cookie;
            const cookie = header ? header.split('code=')[1] : undefined;
            if (!cookie) {
                return res.status(401).json({ error: "Code not found in cookie" });
            }
            ;
            const hashMatch = bcrypt_1.default.compare(String(code), cookie);
            if (!hashMatch) {
                return res.status(401).json({ error: "This code is not valid" });
            }
            ;
            return res.status(200).json({ message: "Code is valid" });
        }
        catch (error) {
            console.log(error);
        }
    }
    ;
    async ChangePassword(req, res) {
        try {
            const { newPassword } = req.body;
            const header = req.headers.cookie;
            const cookie = header ? header.split('code=')[1] : undefined;
            if (!cookie) {
                return res.status(401).json({ error: "Cookie is not found" });
            }
            ;
            const decryptedCookie = bcrypt_1.default.compare('', cookie);
            if (!decryptedCookie) {
                return res.status(401).json({ error: "Invalid cookie" });
            }
            const email = decryptedCookie.split("|");
            const service = new user_service_1.default();
            const data = await service.ChangePassword(email, newPassword);
            return res.status(200).json(data);
        }
        catch (error) {
            console.log(error);
        }
    }
    ;
}
exports.userController = userController;
//# sourceMappingURL=user.controller.js.map