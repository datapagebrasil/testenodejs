import { ApiProperty } from "@nestjs/swagger";
import { IsValidCPF } from "../decorators/valid-cpf.decorator";

export class CreateClienteDto {
    @ApiProperty({required: false})
    nome: string;

    @ApiProperty({required: false})
    telefone: string;

    @ApiProperty({required: false})
    @IsValidCPF({ message: 'CPF não enviado corretamente' })
    cpf: string;
}
