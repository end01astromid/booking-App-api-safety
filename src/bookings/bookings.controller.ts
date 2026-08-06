import { Controller, Post, Get, Body, Param,Delete, UseGuards, Request} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGurad } from 'src/guards/jwt-auth.guard';

@Controller('bookings')
@UseGuards(JwtAuthGurad)
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}
    @Post()
    create(@Request() req, @Body() dto: CreateBookingDto) {
        return this.bookingsService.create(req.user.userId, dto);
    }
    //get my booking
    @Get(':my')
    getMyBookings(@Request() req) {
        return this.bookingsService.findMyBookings(req.user.userId)
    }
    //сancellation of booking
   @Delete(':id')
   cancel(@Param('id') id: string, @Request()req) {
    return this.bookingsService.cancel(id, req.user.userId)
   }
}
