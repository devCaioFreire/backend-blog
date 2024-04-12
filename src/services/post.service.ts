import { IPost } from "models/post.model";
import { prisma } from "../prisma";
import { Request } from "express";
import fs from 'fs';

export default class postService {
  async Create(post: IPost, req: Request) {
    try {
      const imageBuffer = fs.readFileSync(req.file.path);
      const imageBase64 = imageBuffer.toString('base64');

      fs.unlinkSync(req.file.path);

      const publish = await prisma.post.create({
        data: {
          title: post.title,
          summary: post.summary,
          image: imageBase64,
          content: post.content,
          authorID: post.authorID,
          date: new Date(),
        },
      });

      console.log("Creating post with data:", post);

      return publish;
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  async Read(post: IPost) {
    try {
      const posts = await prisma.post.findMany({
        include: {
          author:
            { select: { name: true } }
        }
      });
      return posts;
    } catch (error) {
      console.log(error);
    }
  };

  async ReadByID(postID: string) {
    try {
      const post = await prisma.post.findUnique({
        where: { id: postID },
        include: {
          author:
            { select: { name: true } }
        }
      });

      return post;
    } catch (error) {
      console.log(error);
    }
  };

  async Update(post: Partial<IPost>) {
    try {
      if (!post.id) {
        throw new Error('This ID is not valid')
      }

      const postUpdated = await prisma.post.updateMany(
        {
          where: { id: post.id },
          data: {
            title: post.title,
            summary: post.summary,
            image: post.image,
            content: post.content
          }
        });

      return postUpdated;
    } catch (error) {
      console.log(error)
    }
  };

  async Delete(id: string) {
    try {
      if (!id) {
        throw new Error()
      }

      const post = await prisma.post.findUnique({ where: { id } });

      if (!post) {
        throw new Error('Post not found');
      }

      const deleted = prisma.post.delete({ where: { id } });

      return deleted;
    } catch (error) {
      console.log(error);
    }
  };
} 