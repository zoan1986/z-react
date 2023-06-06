import { DataStoredInToken } from "./../auth/auth.interface";
import { HttpException } from "@core/exceptions";
import IUser from "./users.interface";
import RegisterDto from "./dto/register.dto";
import { TokenData } from "./../auth/auth.interface";
import UserSchema from "./users.model";
import bcryptjs from "bcryptjs";
import gravatar from "gravatar";
import { isEmptyObject } from "@core/utils";
import jwt from "jsonwebtoken";

class UserService {
  public userSchema = UserSchema;

  public async createUser(model: RegisterDto): Promise<TokenData> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const user = await this.userSchema.findOne({ email: model.email }).exec();
    if (user) {
      throw new HttpException(409, `Your email ${model.email} already exist.`);
    }

    const avatar = gravatar.url(model.email!, {
      size: "200",
      rating: "g",
      default: "mm",
    });

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(model.password!, salt);
    const createdUser = await this.userSchema.create({
      ...model,
      password: hashedPassword,
      avatar: avatar,
      date: Date.now(),
    });
    return this.createToken(createdUser);
  }

  public async updateUser(userID: string, model: RegisterDto): Promise<IUser> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const user = await this.userSchema.findById(userID).exec();
    if (!user) {
      throw new HttpException(400, `userID is not exists`);
    }
    let avatar = user.avatar;
    if (user.email === model.email) {
      throw new HttpException(400, "you must using the difference email");
    } else {
      avatar = gravatar.url(model.email!, {
        size: "200",
        rating: "g",
        default: "mm",
      });
    }
    let updateUserById;
    if (model.password) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(model.password, salt);
      updateUserById = await this.userSchema
        .findByIdAndUpdate(userID, {
          ...model,
          avatar: avatar,
          password: hashedPassword,
        })
        .exec();
    } else {
      updateUserById = await this.userSchema
        .findByIdAndUpdate(userID, {
          ...model,
          avatar: avatar,
        })
        .exec();
    }

    if (!updateUserById) throw new HttpException(409, "you are not an user");

    return updateUserById;
  }

  public async getUserById(userId: string): Promise<IUser> {
    const user = await this.userSchema.findById(userId).exec();
    if (!user) {
      throw new HttpException(404, `User is not exists`);
    }
    return user;
  }

  private createToken(user: IUser): TokenData {
    const dataInToken: DataStoredInToken = { id: user._id };
    const secret: string = process.env.JWT_TOKEN_SECRET!;
    const expiresIn: number = 60;
    return {
      token: jwt.sign(dataInToken, secret, { expiresIn: expiresIn }),
    };
  }
}
export default UserService;
