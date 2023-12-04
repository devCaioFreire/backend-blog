var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/app.ts
var import_cors = __toESM(require("cors"));
var import_express2 = __toESM(require("express"));

// src/middleware/upload.ts
var import_multer = __toESM(require("multer"));
var uploadMiddleware = (0, import_multer.default)({ dest: "uploads/" });

// src/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/services/post.service.ts
var postService = class {
  async Create(post) {
    try {
      const publish = await prisma.post.create({
        data: {
          title: post.title,
          summary: post.summary,
          image: post.image,
          content: post.content,
          author: {
            connect: {
              id: post.authorID
            }
          },
          date: /* @__PURE__ */ new Date()
        }
      });
      console.log("Creating post with data:", post);
      return publish;
    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error("Failed to create post.");
    }
  }
  async Read(post) {
    try {
      const post2 = await prisma.post.findMany();
      return post2;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
  async ReadByID(postID) {
    try {
      const post = await prisma.post.findUnique({
        where: { id: postID }
      });
      return post;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to retrieve post by ID.");
    }
  }
  async Update() {
  }
  async Delete() {
  }
};

// src/controllers/post.controller.ts
var postController = class {
  // Publish Post
  async Publish(req, res) {
    const post = { ...req.body };
    const Service = new postService();
    const published = await Service.Create(post);
    res.status(201).json(published);
  }
  // All Posts
  async Post(req, res) {
    const post = { ...req.body };
    const Service = new postService();
    const getPosts = await Service.Read(post);
    res.status(200).json(getPosts);
  }
  // Post by ID
  async PostByID(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Post ID is required" });
    }
    const Service = new postService();
    const getPost = await Service.ReadByID(id);
    if (!getPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(getPost);
  }
};

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

// src/routes/router.ts
var import_express = require("express");
var router = (0, import_express.Router)();
router.get("/Register", new userController().Register);
router.post("/Login", new userController().Login);
router.post("/Publish", uploadMiddleware.single("image"), new postController().Publish);
router.get("/Posts", new postController().Post);
router.get("/Post/:id", new postController().PostByID);

// src/app.ts
var app = (0, import_express2.default)();
app.use(import_express2.default.json());
app.use((0, import_cors.default)());
app.use(router);
app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });
});
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
