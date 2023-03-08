import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateMenuDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  @Type(() => Number)
  price: number;

  @ApiProperty({ required: false })
  photo: string[];

  @ApiProperty({ required: false })
  ingredients: string[];
}
