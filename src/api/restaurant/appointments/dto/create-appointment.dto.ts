import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ required: true })
  @IsNumber()
  clientId: number;

  @ApiProperty({ required: true })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  delivery?: boolean;
}
