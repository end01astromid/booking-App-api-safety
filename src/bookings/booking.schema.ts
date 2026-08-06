import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document , Types} from 'mongoose'


export type BookingDocument = Booking & Document

@Schema({timestamps: true})
export class Booking {
    @Prop({type: Types.ObjectId, ref: 'User', required: true})
    userId!: Types.ObjectId; //Who booking it

    @Prop({type: Types.ObjectId, ref: 'Resource', required: true})
    resourceId!: Types.ObjectId // What was booked (coworking space/meeting room/doctor)
    
    @Prop({required: true})
    startTime!: Date; //When does it start?

    @Prop({required: true})
    endTime!: Date;

    @Prop({
        default: 'confirmed',
        enum: ['pending', 'confirmed', 'cancelled']
    })
    status!: string; //Booking status

}

export const BookingSchema = SchemaFactory.createForClass(Booking);