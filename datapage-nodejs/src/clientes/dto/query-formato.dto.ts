import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

export class QueryFormatoDto {

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(['excel'], { message: 'Formato inválido' })
  formato: string;
}
