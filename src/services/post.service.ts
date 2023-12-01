import { IPost } from "models/post.model";
import { prisma } from "../prisma";

export default class postService {
  async Create(post: IPost) {
    try {
      const publish = await prisma.post.create({
        data: {
          ...post,
          date: new Date(),
        }
      });

      console.log(post)
      return publish;
    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error("Failed to create post.");
    }
  };

  async Read() {

  };

  async ReadByID() {

  };

  async Update() {

  };

  async Delete() {

  };
} 