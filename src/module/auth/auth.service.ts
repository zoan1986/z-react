import { DataStoredInToken } from "./auth.interface";
import LoginDto from "./auth.dto";
import { UserSchema } from "@module/users";
import { isEmptyObject } from "@core/utils";
import { HttpException } from "@core/exceptions";
import gravatar from "gravatar";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser, TokenData } from "@module/auth";

class AuthService {
  public userSchema = UserSchema;

  public async login(model: LoginDto): Promise<TokenData> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, `Model is empty`);
    }

    const user = await this.userSchema.findOne({ email: model.email }).exec();
    if (!user) {
      throw new HttpException(409, `your email ${model.email} already exist. `);
    }

    const avatar = gravatar.url(model.email!, {
      size: "200",
      rating: "g",
      default: "mm",
    });

    const salt = await bcryptjs.genSalt(10);

    const isMatchPassword = await bcryptjs.compare(
      model.password,
      user.password
    );
    if (!isMatchPassword)
      throw new HttpException(400, "credential is not valid");
    return this.createToken(user);
  }

  public async getCurrentLoginUser(userID: string): Promise<IUser> {
    const user = await this.userSchema.findById(userID).exec();
    if (!user) {
      throw new HttpException(404, `User is not exists`);
    }
    return user;
  }

  private createToken(user: IUser): TokenData {
    const dataInToken: DataStoredInToken = { id: user._id };
    const secret: string = process.env.JWT_TOKEN_SECRET!;
    const expiresIn: number = 3660;
    return {
      token: jwt.sign(dataInToken, secret, { expiresIn: expiresIn }),
    };
  }
}

export default AuthService;
