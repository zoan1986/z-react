import { Request, Response, NextFunction } from "express";
import RegisterDto from "./dto/register.dto";
import UserService from "./users.service";
import { TokenData } from "@module/auth";

export default class UsersController {
  private userService = new UserService();

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getAll();
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  public getAllPaging = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page: number = Number(req.params.page);
      const keyword = req.query.keyword || "";
      const paginationResult = await this.userService.getAllPaging(
        keyword.toString(),
        page
      );
      res.status(201).json(paginationResult);
    } catch (error) {
      next(error);
    }
  };

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: RegisterDto = req.body;
      const tokenData: TokenData = await this.userService.createUser(model);
      res.status(201).json(tokenData);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: RegisterDto = req.body;
      const user = await this.userService.updateUser(req.params.id, model);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.userService.deleteUser(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
