import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './booking.schema';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { ResourcesModule } from '../resources/resources.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema }
    ]),
    ResourcesModule, // чтобы проверять существует ли ресурс
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}