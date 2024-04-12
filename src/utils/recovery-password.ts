import { createTransport } from "nodemailer";

export const transporter = createTransport({
  host: process.env.HOST,
  port: Number(process.env.PORT),
  secure: process.env.SECURE === "true",
  auth: {
    user: process.env.USER_FROM_MAIL,
    pass: process.env.PASS_FROM_MAIL,
  },
});