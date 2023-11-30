import { Request, Response } from "express";
import userService from "../services/user.service";
import { prisma } from "../prisma";
import { IUser } from "../models/user.model";
import bcrypt from 'bcrypt';
import { sign } from "jsonwebtoken";

export class userController {
  async Register(req: Request, res: Response) {
    const user: IUser = { ...req.body };
    const Service = new userService();
    const userRegistered = await Service.Create(user);
    res.status(201).json(userRegistered);
  }

  async Login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });

    try {
      if (!user) {
        console.log('User not found');
      }

      const passwordMatch = await bcrypt.compare(password, user.password!);

      if (passwordMatch) {
        const token = sign({ id: user.id, email: user.email }, process.env.JWT_TOKEN, { expiresIn: '24h' });
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
  }
}