import { Router } from "express";
import { Route } from "@core/interfaces";
import UsersController from "./users.controller";
import validationMiddleware from "@core/middleware/validation.middleware";
import RegisterDto from "./dto/register.dto";
import { authMiddleware } from "@core/middleware";

export default class UsersRoute implements Route {
  public path = "/api/users";
  public router = Router();

  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path,
      validationMiddleware(RegisterDto, true),
      this.usersController.register
    );

    this.router.put(
      this.path + "/:id",
      validationMiddleware(RegisterDto, true),
      this.usersController.updateUser
    );

    this.router.get(this.path + "/:id", this.usersController.getUserById);

    this.router.get(this.path, this.usersController.getAll);

    this.router.get(
      this.path + "/paging/:page",
      this.usersController.getAllPaging
    );

    this.router.delete(
      this.path + "/:id",
      authMiddleware,
      this.usersController.deleteUser
    );
  }
}
