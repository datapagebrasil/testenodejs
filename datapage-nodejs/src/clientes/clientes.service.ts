import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { QueryFormatoDto } from './dto/query-formato.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import Cliente from './entities/cliente.entity';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import { ItensService } from 'src/itens/itens.service';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) private clientesRepository: Repository<Cliente>,
    private readonly itensService: ItensService,
  ) {}

  public async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const novoCliente = this.clientesRepository.create(createClienteDto);
    await this.clientesRepository.save(novoCliente);
    return novoCliente;
  }

  public async findAll(): Promise<Cliente[]> {
    const clientes = await this.clientesRepository.find();
    return clientes;
  }

  public async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOne(id);
    if (!cliente) throw new NotFoundException('Cliente não encontrado');
    return cliente;
  }

  public async findAllSellingsByClientId(
    id: number,
    query: QueryFormatoDto,
  ): Promise<any> {
    const resQuery = await this.clientesRepository
      .createQueryBuilder('cliente')
      .leftJoinAndSelect('cliente.vendas', 'vendas')
      .leftJoinAndSelect('vendas.itens', 'itens')
      .select([
        'cliente.nome',
        'cliente.telefone',
        'vendas.id as venda_id',
        'vendas.data_cadastro as data_compra',
        'vendas.codigo_nota_fiscal as codigo_nota_fiscal',
        'sum(itens.valor) as valor_total',
      ])
      .where('cliente.id = :id', { id })
      .groupBy('vendas.id')
      .getRawMany();

    if (!resQuery || !resQuery.length) {
      throw new NotFoundException('Cliente não encontrado');
    }
    // criacao do arquivo .xlsx
    if (query.formato) return await this.writeJsonToExcel(resQuery);
    // recuperando itens para cada venda do cliente
    for (const cliente of resQuery) {
      cliente['itens'] = await this.itensService.findItemsPerSelling(
        cliente.venda_id,
      );
    }
    // removendo campo 'venda_id'
    const resultado = resQuery.map(({ venda_id, ...data }) => data);

    return { resultado, mensagem: 'Vendas carregadas do cliente' };
  }

  public async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    await this.clientesRepository.update(id, updateClienteDto);
    const clienteAtualizado = await this.clientesRepository.findOne(id);
    if (!clienteAtualizado)
      throw new NotFoundException('Cliente não encontrado');
    return clienteAtualizado;
  }

  public async remove(id: number): Promise<void> {
    const clienteRemovido = await this.clientesRepository.delete(id);
    if (!clienteRemovido.affected)
      throw new NotFoundException('Cliente não encontrado');
  }

  private async writeJsonToExcel(data: any): Promise<any> {
    const fileName = 'arquivo.xlsx';
    const folderName = 'arquivos';
    const filePath = `/${folderName}/${fileName}`;
    await fs.promises.mkdir(`src/resources/${folderName}`, { recursive: true });

    const reshapedData = data.map(({ cliente_telefone, ...row }) => ({
      'Cliente Nome': row['cliente_nome'],
      'Data Venda': row['data_compra'],
      'Codigo Nota Fiscal': row['codigo_nota_fiscal'],
      'Valor Total': row['valor_total'],
    }));

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(reshapedData);
    worksheet['!cols'] = [
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
    ];
    xlsx.utils.book_append_sheet(workbook, worksheet, 'vendas');
    xlsx.writeFile(workbook, `src/resources${filePath}`);

    return { resultado: filePath, mensagem: 'Ok excel gerado' };
  }
}
