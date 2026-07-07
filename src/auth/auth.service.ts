import { Injectable,ConflictException, UnauthorizedException, BadRequestException} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/user.shema';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto,LoginDto, UpdateProfileDto} from 'src/dto/dtos';
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private UserModel: Model<User>){}
    async register(dto: RegisterDto){
        const {email,password} = dto 
        const candidate = await this.UserModel.findOne({email})
            if(candidate) {
                throw new ConflictException('Пользователь с таким email уже существует');
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            
            const newUser = new this.UserModel({
                email,
                password: hashedPassword
            })

            const usersave = await newUser.save()
            
            return {
                id: usersave._id,
                email: usersave.email
            }
    }

}
