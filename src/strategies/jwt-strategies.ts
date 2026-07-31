import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import {ExtractJwt, Strategy} from 'passport-jwt'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || "your-secret-keys" 
        })
    }

     async validate(payload: any) {
        // payload — это данные, которые зашифрованы внутри токена (например: id, email)
        // То, что вы вернете отсюда, NestJS автоматически запишет в req.user
        
        if (!payload) {
            throw new UnauthorizedException('Токен не содержит данных');
        }

        return { userId: payload.sub, email: payload.email }; 
    }
}