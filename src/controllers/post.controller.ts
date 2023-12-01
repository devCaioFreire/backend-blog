import { Request, Response } from "express";
import { IPost } from '../models/post.model'
import postService from "../services/post.service";

export default class postController {
  async Publish(req: Request, res: Response) {
    const post: IPost = { ...req.body }
    const Service = new postService();
    const published = await Service.Create(post);
    res.status(201).json(published);
  };
}