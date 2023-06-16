import { Router } from "express";
import { Route } from "@core/interfaces";
import validationMiddleware from "@core/middleware/validation.middleware";
import { authMiddleware } from "@core/middleware";
import postsController from "./posts.controller";
import CreatePostDto from "./dto/create_post.dto";

export default class postsRoute implements Route {
  public path = "/api/v1/posts";
  public router = Router();

  public postController = new postsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(CreatePostDto, true),
      this.postController.CreatePost
    );

    this.router.put(
      this.path + "/:id",
      authMiddleware,
      validationMiddleware(CreatePostDto, true),
      this.postController.updatePost
    );

    this.router.get(this.path, this.postController.getAllPosts);

    this.router.get(this.path + "/:id", this.postController.getPostById);

    this.router.get(
      this.path + "/paging/:page",
      this.postController.getAllPaging
    );

    this.router.delete(
      this.path + "/:id",
      authMiddleware,
      this.postController.deletePost
    );
  }
}
