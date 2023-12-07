import { IPost } from "models/post.model";
import { prisma } from "../prisma";
import { Request } from "express";
import fs from 'fs';

export default class postService {
  async Create(post: IPost, req: Request) {
    try {
      const imageBuffer = fs.readFileSync(req.file.path);
      const imageBase64 = imageBuffer.toString('base64');

      // Remover o arquivo temporário após a leitura
      fs.unlinkSync(req.file.path);

      const publish = await prisma.post.create({
        data: {
          title: post.title,
          summary: post.summary,
          image: imageBase64,
          content: post.content,
          author: {
            connect: {
              id: post.authorID,
            },
          },
          date: new Date(),
        },
      });

      console.log("Creating post with data:", post);

      return publish;
    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error("Failed to create post.");
    }
  };

  async Read(post: IPost) {
    try {
      const post = await prisma.post.findMany();
      return post;
    } catch (error) {
      console.log(error);
      throw new Error()
    }
  };

  async ReadByID(postID: string) {
    try {
      const post = await prisma.post.findUnique({
        where: { id: postID }
      });
      return post;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to retrieve post by ID.");
    }
  };

  async Update() {

  };

  async Delete() {

  };
} 