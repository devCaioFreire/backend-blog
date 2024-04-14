import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import bcrypt from 'bcrypt';
import userService from "../services/user.service";
import { prisma } from "../prisma";
import { IUser } from "../models/user.model";
import { transporter } from "../utils/recovery-password";
import { HTML_RECOVERY_EMAIL } from "../utils/html-email-recovery";
import { generateOTP } from "../utils/generate-otp";

export class userController {
  async Register(req: Request, res: Response) {
    const user: IUser = { ...req.body };
    const Service = new userService();
    const userRegistered = await Service.Create(user);
    res.status(201).json(userRegistered);
  };

  async Login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });

    try {
      if (!user) {
        console.log('User not found');
      }

      const passwordMatch = await bcrypt.compare(password, user.password!);

      if (passwordMatch) {
        const token = sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_TOKEN, { expiresIn: '24h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ user, token })
      } else {
        console.log('Senha incorreta');
        res.status(401).json({ error: 'Senha incorreta' });
      }

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };

  async RecoveryPassword(req: Request, res: Response) {
    try {
      const { email }: { email: string } = req.body;
      const verificationCode = generateOTP();
      const cookie = email + verificationCode;
      const hash = bcrypt.hashSync(cookie, 12);
      const html = HTML_RECOVERY_EMAIL(Number(verificationCode));

      const info = await transporter.sendMail({
        from: `"Personal Assistent by Caio Freire" <${process.env.USER_FROM_MAIL}}>`,
        to: email,
        subject: "Recovery Password",
        text: "Copy the code below and paste it into the blog to recover your password.",
        html: html
      });

      const expires = new Date(new Date().getTime() + 24 * 60 * 1000);
      res.cookie("code", hash, { expires, httpOnly: true, secure: true })

      return res.json(info);
    } catch (error) {
      console.log(error)
    }
  };

  async ConfirmCode(req: Request, res: Response) {
    try {
      const { code }: { code: number } = req.body;

      const header = req.headers.cookie;
      const cookie = header ? header.split('code=')[1] : undefined;

      if (!cookie) {
        return res.status(401).json({ error: "Code not found in cookie" });
      }

      const hashMatch = bcrypt.compare(String(code), cookie);

      if (!hashMatch) {
        return res.status(401).json({ error: "This code is not valid" });
      }

      return res.status(200).json({ message: "Code is valid" });
    } catch (error) {
      console.log(error);
    }
  };

  async ChangePassword(req: Request, res: Response) {
    const body = req.body;
    const cookie = req.headers.cookie
  };
}