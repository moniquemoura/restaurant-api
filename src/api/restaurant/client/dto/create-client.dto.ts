import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  doc: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dateOfBirth: Date;
}
