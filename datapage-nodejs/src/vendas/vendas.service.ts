import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import Venda from './entities/venda.entity';

@Injectable()
export class VendasService {
  constructor(@InjectRepository(Venda) private vendasRepository: Repository<Venda>) { }
  
  public async create(createVendaDto: CreateVendaDto) {
    const newSelling = this.vendasRepository.create(createVendaDto);
    await this.vendasRepository.save(newSelling);
    return newSelling;
  }

  public findAll(): Promise<Venda[]> {
    return this.vendasRepository.find();
  }

  public async findOne(id: number): Promise<Venda> {
    const selling = await this.vendasRepository.findOne(id);
    if (!selling) throw new NotFoundException('Venda não encontrada');
    return selling;
  }

  public async update(id: number, updateVendaDto: UpdateVendaDto) {
    await this.vendasRepository.update(id, updateVendaDto);
    const updatedSelling = await this.vendasRepository.findOne(id);
    if (!updatedSelling) throw new NotFoundException('Venda não encontrada');
    return updatedSelling;
  }

  public async remove(id: number) {
    const deleteSelling = await this.vendasRepository.delete(id);
    if (!deleteSelling.affected) throw new NotFoundException('Venda não encontrada');
  }
}
