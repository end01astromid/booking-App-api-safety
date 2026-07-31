import { Module }from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { User, UserSchema } from '../users/user.shema'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from '../strategies/jwt-strategies';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
     PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || "your-secret-keys"
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    PassportModule,
    JwtStrategy
  ]
})

export class AuthModule {}