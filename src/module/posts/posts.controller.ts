import { Request, Response, NextFunction } from "express";
import PostService from "./posts.service";
import CreatePostDto from "./dto/create_post.dto";

export default class PostController {
  private postService = new PostService();

  public CreatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CreatePostDto = req.body;
      const userId = req.user.id;
      const result = await this.postService.createPost(userId, model);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  public updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CreatePostDto = req.body;
      const postId = req.params.id;
      const result = await this.postService.updatePost(postId, model);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}
