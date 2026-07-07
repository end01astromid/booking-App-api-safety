import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto} from 'src/dto/dtos';
import { Get, Post, Body } from '@nestjs/common';


@Controller()
export class AuthController {
    constructor(private readonly Authservice: AuthService){}
    @Post('register')
    register(@Body() dto: RegisterDto){
        return this.Authservice.register(dto)
    }



    
}
