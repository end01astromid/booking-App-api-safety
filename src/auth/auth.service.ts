import { Injectable,ConflictException, UnauthorizedException, BadRequestException} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/user.shema';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto,LoginDto, UpdateProfileDto} from 'src/dto/dtos';
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private UserModel: Model<User>, private JwtService: JwtService){}
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

    async login(dto: LoginDto){
        const {email, password} = dto

        const chekUser = await this.UserModel.findOne({email})
        if(!chekUser){
          throw new UnauthorizedException('Неверный email или пароль');
    }

     // 2. Сравнение хэша пароля из БД с паролем от клиента
     const isPasswordValid = bcrypt.compare(password, chekUser.password);
     if(!isPasswordValid){
        throw new UnauthorizedException('Неверный email или пароль');
     }

     const payload = {sub: chekUser._id, email: chekUser.email}

    return{ 
        message: "Успех",
        access_token: await this.JwtService.signAsync(payload),
    }
}
}