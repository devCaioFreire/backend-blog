import { Request, Response } from "express";
import { IPost } from '../models/post.model'
import postService from "../services/post.service";
import multer from "multer";

export default class postController {

  // Publish Post
  async Publish(req: Request, res: Response) {
    try {
      const Service = new postService();

      if (!req.file) {
        return res.status(400).json({ error: 'Image is required' });
      }

      // Extract necessary data from the request
      const { title, summary, content, authorID } = req.body;
      const image = req.file ? req.file.path : undefined;
      
      // Create post using the service
      const published = await Service.Create({
        id: "",
        title,
        summary,
        content,
        authorID,
        image,
        date: new Date()
      }, req);

      // Inclua a URL ou identificador único no retorno
      const imageUrl = `/uploads/${published.id}/image`; // Modifique conforme necessário
      res.status(201).json({
        message: 'Post created successfully',
        published: { ...published, imageUrl },
        imageUrl, // Adiciona a URL da imagem no retorno
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