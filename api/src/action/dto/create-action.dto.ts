import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateActionDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Date is required' })
  date: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'User is required' })
  userId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Type is required' })
  typeId: number;
}
