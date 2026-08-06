import {isString, IsDateString, IsMongoId, IsString,} from 'class-validator'



export class CreateBookingDto {
    @IsMongoId()
    resourceId!: string;

    @IsDateString()
    startTime!: string;

    @IsDateString()
    endTime!: string ;
}