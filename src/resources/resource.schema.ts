import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ResourceDocument = Resource & Document;

@Schema({timestamps: true})
export class Resource {
    @Prop({required: true})
    name!: string;

    @Prop({required: true, enum: ['coworking', 'meeting-room', 'doctor']})
    type!:string;

    @Prop({ required: true })
    address!: string;

    @Prop()
   description?: string;

   @Prop({ default: true })
    isActive!: boolean;

   @Prop({ type: [String] })
    amenities?: string[];

    @Prop()
    pricePerHour?: number;

    @Prop()
    ownerId?: string;

}

