var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/post.controller.ts
var post_controller_exports = {};
__export(post_controller_exports, {
  default: () => postController
});
module.exports = __toCommonJS(post_controller_exports);

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
