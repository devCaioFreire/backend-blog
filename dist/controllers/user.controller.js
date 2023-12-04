var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/user.controller.ts
var user_controller_exports = {};
__export(user_controller_exports, {
  userController: () => userController
});
module.exports = __toCommonJS(user_controller_exports);

// src/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/services/user.service.ts
var import_bcrypt = require("bcrypt");
var userService = class {
  async Create(user) {
    try {
      console.log(user);
      const emailJaECadastrado = await prisma.user.findFirst({ where: { email: user.email } });
      if (emailJaECadastrado) {
        throw new Error("Email j\xE1 cadastrado");
      }
      user.password = await (0, import_bcrypt.hash)(user.password, 13);
      const userCreated = await prisma.user.create({ data: user });
      return userCreated;
    } catch (error) {
      console.log("Erro:", error);
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
  async ReadByID(idUser) {
    try {
      if (parseInt(idUser) <= 0) {
        throw new Error("ID do Usuario Invalido");
      }
      const user = await prisma.user.findFirstOrThrow({ where: { id: idUser } });
      return user;
    } catch (error) {
    }
  }
  async Update() {
  }
  async Delete() {
  }
};

// src/controllers/user.controller.ts
var import_bcrypt2 = __toESM(require("bcrypt"));
var import_jsonwebtoken = require("jsonwebtoken");
var userController = class {
  async Register(req, res) {
    const user = { ...req.body };
    const Service = new userService();
    const userRegistered = await Service.Create(user);
    res.status(201).json(userRegistered);
  }
  async Login(req, res) {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({ where: { email } });
    try {
      if (!user) {
        console.log("User not found");
      }
      const passwordMatch = await import_bcrypt2.default.compare(password, user.password);
      if (passwordMatch) {
        const token = (0, import_jsonwebtoken.sign)({ id: user.id, name: user.name, email: user.email }, process.env.JWT_TOKEN, { expiresIn: "24h" });
        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1e3 });
        res.json({ user, token });
      } else {
        console.log("Senha incorreta");
        res.status(401).json({ error: "Senha incorreta" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userController
});
