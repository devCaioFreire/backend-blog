"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../prisma");
const bcrypt_1 = require("bcrypt");
class userService {
    async Create(user) {
        try {
            console.log(user);
            const emailJaECadastrado = await prisma_1.prisma.user.findFirst({ where: { email: user.email } });
            if (emailJaECadastrado) {
                throw new Error('Email já cadastrado');
            }
            user.password = await (0, bcrypt_1.hash)(user.password, 13);
            const userCreated = await prisma_1.prisma.user.create({ data: user });
            return userCreated;
        }
        catch (error) {
            console.log('Erro:', error);
        }
    }
    ;
    async Read() {
        try {
            const users = await prisma_1.prisma.user.findMany();
            return users;
        }
        catch (error) {
            console.log(error);
        }
    }
    ;
    async ReadByID(idUser) {
        try {
            if (parseInt(idUser) <= 0) {
                throw new Error('ID do Usuario Invalido');
            }
            const user = await prisma_1.prisma.user.findFirstOrThrow({ where: { id: idUser } });
            return user;
        }
        catch (error) { }
    }
    ;
    async Update() { }
    ;
    async RecoveryPassword(email) {
        const user = prisma_1.prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            console.log("This user is not found");
            throw new Error();
        }
        ;
        return user;
    }
    ;
    async ChangePassword(email, password) {
        const user = prisma_1.prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            console.log("This user is not found");
            throw new Error();
        }
        ;
        const updatePassword = prisma_1.prisma.user.update({
            where: { email },
            data: { password }
        });
        return updatePassword;
    }
    ;
    async Delete() { }
}
exports.default = userService;
//# sourceMappingURL=user.service.js.map