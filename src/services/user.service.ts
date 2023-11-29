import { prisma } from "../prisma";
import { hash, genSalt } from "bcrypt";
import { IUser } from "models/user.model";

export default class userService {
  async Create(user: IUser) {
    try {
      console.log(user);
      const emailJaECadastrado = await prisma.user.findFirst({ where: { email: user.email } });
      if (emailJaECadastrado) {
        throw new Error('Email já cadastrado')
      }

      user.password = await hash(user.password, 13);

      const userCreated = await prisma.user.create({ data: user });

      return userCreated;
    } catch (error) {
      console.log('Erro:', error);
    }
  }

  async Read() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  async ReadByID(idUser: string) {
    try {
      if (parseInt(idUser) <= 0) {
        throw new Error('ID do Usuario Invalido')
      }
      const user = await prisma.user.findFirstOrThrow({ where: { id: idUser } });
      return user;
    } catch (error) { }
  }

  async Update() { }

  async Delete() { }
}