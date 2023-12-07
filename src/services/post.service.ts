import { IPost } from "models/post.model";
import { prisma } from "../prisma";
import { Request } from "express";

export default class postService {
  async Create(post: IPost, req: Request) {
    try {
      const publish = await prisma.post.create({
        data: {
          title: post.title,
          summary: post.summary,
          image: `/uploads/${req.file.filename}`, // Assuming 'filename' is the property with the uploaded file name
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