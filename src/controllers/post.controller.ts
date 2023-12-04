import { Request, Response } from "express";
import { IPost } from '../models/post.model'
import postService from "../services/post.service";
import multer from "multer";

export default class postController {

  // Publish Post
  async Publish(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const post: IPost = { ...req.body, image: req.file.buffer.toString('base64') }
    const Service = new postService();
    const published = await Service.Create(post);
    res.status(201).json(published);
  };

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
}