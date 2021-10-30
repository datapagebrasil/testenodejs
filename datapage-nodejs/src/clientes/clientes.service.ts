import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { QueryFormatoDto } from './dto/query-formato.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import Cliente from './entities/cliente.entity';
import * as fastcsv from 'fast-csv';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ClientesService {
  constructor(@InjectRepository(Cliente) private clientesRepository: Repository<Cliente>){}

  async create(createClienteDto: CreateClienteDto) {
    const newClient = this.clientesRepository.create(createClienteDto);
    await this.clientesRepository.save(newClient);
    return newClient;
  }

  findAll(): Promise<Cliente[]> {
    return this.clientesRepository.find();
  }

  async findOne(id: number): Promise<Cliente> {
    const client = await this.clientesRepository.findOne(id);
    if (!client) throw new NotFoundException('Cliente não encontrado');
    return client;
  }

  async findAllSellingsByClientId(id: number, query: QueryFormatoDto): Promise<any> {
    const cliente = await this.clientesRepository
      .createQueryBuilder('cliente')
      .leftJoinAndSelect('cliente.vendas', 'vendas')
      .leftJoinAndSelect('vendas.itens', 'itens')
      .select([
        'cliente.nome',
        'cliente.telefone',
        'vendas.data_cadastro as data_compra',
        'vendas.codigo_nota_fiscal as codigo_nota_fiscal',
        'sum(itens.valor) as valor_total'
      ])
      .where("cliente.id = :id", { id })
      .groupBy('vendas.id')
      .getRawMany();
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    if (query.formato) {
      const doc = fs.createWriteStream('arquivo.xlsx');
      fastcsv.write(cliente, { headers: true })
        .on("finish", function () {
          Logger.log('Informações escritas no CSV');
        }).pipe(doc);
      
      return { resultado: "/arquivos/arquivo.xlsx", mensagem: "Ok excel gerado" }
    }
    
    return {resultado: cliente, mensagem: "Vendas carregadas do cliente"};
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    await this.clientesRepository.update(id, updateClienteDto);
    const updatedClient = await this.clientesRepository.findOne(id);
    if (!updatedClient) throw new NotFoundException('Cliente não encontrado');
    return updatedClient;
  }

  async remove(id: number) {
    const deleteClient = await this.clientesRepository.delete(id);
    // 'affected' checks the count of removed elements
    if (!deleteClient.affected) throw new NotFoundException('Cliente não encontrado');
  }
}
