import { DataStoreInToken, TokenData } from '@module/auth';
import RegisterDto from './dto/register.dto';
import UserSchema from './users.model'
import { isEmptyObject } from '@core/utils';
import { HttpException } from '@core/exceptions';
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import IUser from './users.interface';

class UserService {
    public userSchema = UserSchema;

    public async createUser(model: RegisterDto): Promise<TokenData>{
        isEmptyObject(model){
            throw new HttpException(400,'Model is empty');
        }

        const user = this.userSchema.findOne({email: model.email });
        if(user) 
        {
            throw new HttpException(409, `your email ${model.email} already exist. `); 
        }

        const avatar = gravatar.url(model.email!, {
            size:'200',
            rating: 'g',
            default: 'mm',
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
    private createToken(user: IUser): TokenData{
        const dataInToken: DataStoreInToken = {id: user._id};
        const secret: string = process.env.JWT_TOKEN_SECRET!;
        const expiresIn: number = 3600;
        return {
            token: jwt.sign(dataInToken,secret,{expiresIn:expiresIn})
        }

    }
}

export default UserService;