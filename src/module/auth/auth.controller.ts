import { Request, Response, NextFunction } from "express";
import AuthService from "./auth.service";
import LoginDto from "./auth.dto";
import { TokenData } from "@module/auth";

export default class AuthController {
  private authService = new AuthService();
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: LoginDto = req.body;
      const tokenData: TokenData = await this.authService.login(model);
      res.status(200).json(tokenData);
    } catch (error) {
      next(error);
    }
  };
  public getCurrentLoginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.authService.getCurrentLoginUser(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}
