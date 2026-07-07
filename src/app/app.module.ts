import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AuthModule } from "src/auth/auth.module"

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/mongoo-book'),
        AuthModule,
    ]
 })
export class AppModule {}