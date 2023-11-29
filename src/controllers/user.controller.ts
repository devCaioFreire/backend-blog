import { Request, Response } from "express";
import userService from "../services/user.service";
import { prisma } from "../prisma";
import { IUser } from "../models/user.model";
import bcrypt from 'bcrypt';

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
        res.json({ user });
      } else {
        console.log('Senha incorreta');
        res.status(401).json({ error: 'Senha incorreta' });
      }

    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}