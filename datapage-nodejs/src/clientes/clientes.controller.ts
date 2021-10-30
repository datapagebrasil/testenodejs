import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { QueryFormatoDto } from './dto/query-formato.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    const cliente = await this.clientesService.create(createClienteDto);
    return {
      mensagem: "Cliente inserido com sucesso",
      erro: 0,
      dados: {
        id: cliente.id,
        nome: cliente.nome
      }
    };
  }

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesService.findOne(+id);
  }

  @Get(':id/gerar-vendas')
  async findSellingsByClient(@Param('id') id: string, @Query() query: QueryFormatoDto) {
    const { resultado, mensagem } = await this.clientesService.findAllSellingsByClientId(+id, query);
    return {
      mensagem,
      erro: 0,
      dados: resultado
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clientesService.update(+id, updateClienteDto);
    return {
      mensagem: "Cliente atualizado com sucesso",
      erro: 0,
      dados: {
        id: cliente.id,
        nome: cliente.nome
      }
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(+id);
  }
}
