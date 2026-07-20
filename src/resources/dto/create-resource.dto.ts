import { IsString, IsEnum, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateResourceDto {
    @IsString()
    name!: string
    
    @IsEnum(['coworking', 'meeting-rom', 'doctor'])
    type!: string

    @IsString()
    address!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    amenities?: string[];

    @IsOptional()
    @IsNumber()
    pricePerHour?: number;
}