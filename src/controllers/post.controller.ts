import { Request, Response } from "express";
import { IPost } from '../models/post.model'
import postService from "../services/post.service";
import multer from "multer";

export default class postController {

  // Publish Post
  async Publish(req: Request, res: Response) {
    try {
      // Check if an image file is uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'Image is required' });
      }

      // Extract necessary data from the request
      const { title, summary, content, authorID } = req.body;

      // Create post using the service
      const Service = new postService();
      const published = await Service.Create({
        title, summary, content, authorID,
        id: "",
        image: "",
        date: new Date()
      }, req);

      // Send a response back to the client
      res.status(201).json({
        message: 'Post created successfully',
        // Include any additional data you want to send back
        published,
      });
    } catch (error) {
      console.error('Error publishing post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  }
  // async Publish(req: Request, res: Response) {
  //   if (!req.file) {
  //     return res.status(400).json({ error: 'Image is required' });
  //   }
  //   console.log(req.files)
  //   console.log(req.file)

  //   const post: IPost = { ...req.body }
  //   const Service = new postService();
  //   const published = await Service.Create(post);
  //   res.status(201).json(published);
  // };

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