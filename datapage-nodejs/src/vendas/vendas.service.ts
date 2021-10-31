import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import Venda from './entities/venda.entity';

@Injectable()
export class VendasService {
  constructor(
    @InjectRepository(Venda) private vendasRepository: Repository<Venda>,
  ) {}

  public async create(createVendaDto: CreateVendaDto): Promise<Venda> {
    const nodaVenda = this.vendasRepository.create(createVendaDto);
    await this.vendasRepository.save(nodaVenda);
    return nodaVenda;
  }

  public findAll(): Promise<Venda[]> {
    return this.vendasRepository.find();
  }

  public async findOne(id: number): Promise<Venda> {
    const venda = await this.vendasRepository.findOne(id);
    if (!venda) throw new NotFoundException('Venda não encontrada');
    return venda;
  }

  public async update(
    id: number,
    updateVendaDto: UpdateVendaDto,
  ): Promise<Venda> {
    await this.vendasRepository.update(id, updateVendaDto);
    const vendaAtualizada = await this.vendasRepository.findOne(id);
    if (!vendaAtualizada) throw new NotFoundException('Venda não encontrada');
    return vendaAtualizada;
  }

  public async remove(id: number): Promise<void> {
    const vendaRemovida = await this.vendasRepository.delete(id);
    if (!vendaRemovida.affected)
      throw new NotFoundException('Venda não encontrada');
  }
}
