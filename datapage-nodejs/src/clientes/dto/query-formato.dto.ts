import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class QueryFormatoDto {
  @ApiProperty({ required: false, enum: ['excel'] })
  @IsOptional()
  @IsEnum(['excel'], {
    message: 'Formato inválido. Apenas o formato "excel" está disponível.',
  })
  formato: string;
}
