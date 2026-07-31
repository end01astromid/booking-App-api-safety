import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto} from 'src/dto/dtos';
import { Get, Post, Body, Patch, HttpCode, HttpStatus ,UseGuards, Request } from '@nestjs/common';
import { JwtAuthGurad } from '../guards/jwt-auth.guard';


@Controller()
export class AuthController {
    constructor(private readonly Authservice: AuthService){}
    @Post('register')
    register(@Body() dto: RegisterDto){
        return this.Authservice.register(dto)
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    logins(@Body() LoginDto:LoginDto) {
        return this.Authservice.login(LoginDto)
    }
    
}
