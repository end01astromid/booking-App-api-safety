import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ResourcesService } from 'src/resources/resources.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    private resourcesService: ResourcesService
  ) {}

  async create(userId: string, dto: CreateBookingDto) {
    //1 Проверяем существование ресурса
    await this.resourcesService.findOne(dto.resourceId);

    // Валидация дат
    const start = new Date(dto.startTime);
    const end = new Date(dto.endTime);

    if (start >= end) {
      throw new ConflictException('Время начала должно быть раньше времени окончания');
    }

    //2 Проверка нет ли пересечений
    const conflict = await this.bookingModel.findOne({
      resourceId: dto.resourceId,
      status: { $ne: 'cancelled' },
      $or: [
        { startTime: { $lt: end }, endTime: { $gt: start } }
      ]
    });

    if (conflict) {
      throw new ConflictException('Это время уже занято');
    }

    //3 Создаем и сохраняем booking
    const booking = new this.bookingModel({
      userId,
      resourceId: dto.resourceId,
      startTime: start,
      endTime: end,
      status: 'confirmed' 
    });

    return booking.save();

  }
  //4 Получение списка активных броней текущего пользователя
  async findMyBookings(userId: string) {
    return this.bookingModel
      .find({ userId, status: { $ne: 'cancelled' } })
      .populate('resourceId')
      .sort({ startTime: 1 })
      .exec();
  }

  async cancel(bookingId: string, userId: string) {
    //Автоматически удаляет невидимый символ \n и лишние пробелы из ID//
    const cleanBookingId = bookingId.trim();

    const booking = await this.bookingModel.findOne({
      _id: cleanBookingId,
      userId,
    });

    if (!booking) {
      throw new NotFoundException('Бронь не найдена');
    }

    //Меняем статус на отмененный 
    booking.status = 'cancelled'; 
    return booking.save();
  }



}
