import { Request, Response } from "express";
import { IPost } from '../models/post.model'
import postService from "../services/post.service";
import fs from 'fs';
import multer from "multer";

export default class postController {

  // Publish Post
  async Publish(req: Request, res: Response) {
    try {
      const Service = new postService();

      if (!req.file) {
        return res.status(400).json({ error: 'Image is required' });
      }

      const { title, summary, content, authorID } = req.body;
      const image = req.file ? req.file.path : undefined;

      const published = await Service.Create({
        id: "",
        title,
        summary,
        content,
        authorID,
        image,
        date: new Date()
      }, req);

      res.status(201).json({
        message: 'Post created successfully',
        published: { ...published },
      });
    } catch (error) {
      console.error('Error publishing post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  }

  // All Posts
  async Post(req: Request, res: Response) {
    const post: IPost = { ...req.body };
    const Service = new postService();
    const getPosts = await Service.Read(post);
    res.status(200).json(getPosts)
  }

  // Post by ID
  async PostByID(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Post ID is required" });
    }

    const Service = new postService();
    const getPost = await Service.ReadByID(id);

    if (!getPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(getPost)
  }

  // Edit Post
  async PostPut(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      throw new Error("Post ID is required")
    }

    const PostToUpdate: Partial<IPost> = { ...req.body };

    let imageBase64;

    if (req.file) {
      const imageBuffer = fs.readFileSync(req.file.path);
      imageBase64 = imageBuffer.toString('base64');
    }

    PostToUpdate.id = id;
    imageBase64 != undefined ? PostToUpdate.image = imageBase64 : undefined;

    const formData: Partial<IPost> = { ...PostToUpdate }

    console.log(formData);
    const Service = new postService();
    const edit = await Service.Update(formData);

    res.status(200).json(edit);
  }

  // Post Delete
  async PostDelete(req: Request, res: Response) {
    const { id } = req.params;

    const Service = new postService();
    const deleted = await Service.Delete(id);

    res.status(200).json(deleted);
  }
}