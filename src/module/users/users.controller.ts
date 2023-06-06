import { Request, Response, NextFunction } from "express";
import RegisterDto from "./dto/register.dto";
import UserService from "./users.service";
import { TokenData } from "@module/auth";

export default class UsersController {
    private userService = new UserService();
    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: RegisterDto = req.body;
            const tokenData : TokenData = await this.userService.createUser(model);
            res.status(201).json(tokenData);
        } catch (error) {
            next(error);
        };
    }
}