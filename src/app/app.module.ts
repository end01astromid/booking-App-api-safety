import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AuthModule } from "src/auth/auth.module"
import { BookingsModule } from "src/bookings/bookings.module"
import { ResourcesModule } from "src/resources/resources.module"


@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/mongoo-book'),
        AuthModule,
        ResourcesModule,
        BookingsModule,
    ]
 })
export class AppModule {}