"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = require("nodemailer");
exports.transporter = (0, nodemailer_1.createTransport)({
    host: process.env.HOST,
    port: Number(process.env.PORT),
    // secure: process.env.SECURE === "true",
    auth: {
        user: process.env.USER_FROM_MAIL,
        pass: process.env.PASS_FROM_MAIL,
    },
});
//# sourceMappingURL=recovery-password.js.map