import {IsEmail, IsString, MinLength, IsOptional} from 'class-validator'

export class RegisterDto {
    @IsEmail()
    email!: string

    @IsString()
    @MinLength(6)
    
    password!:string
}

export class LoginDto { 
    @IsEmail({}, {message: "Некорректный формат email"})
    email!: string

    @MinLength(6, {message: "Пароль должен содержать минимум 6 символов"})
    password!: string
}

export class UpdateProfileDto {
    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @MinLength(6)
    password?: string

}