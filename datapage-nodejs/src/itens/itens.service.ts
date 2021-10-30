import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-iten.dto';
import Item from './entities/item.entity';

@Injectable()
export class ItensService {

  constructor(@InjectRepository(Item) private itensRepository: Repository<Item>) { }

  async create(createItemDto: CreateItemDto) {
    const newItem = this.itensRepository.create(createItemDto);
    await this.itensRepository.save(newItem);
    return newItem;
  }

  findAll(): Promise<Item[]> {
    return this.itensRepository.find();
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itensRepository.findOne(id);
    if (!item) throw new NotFoundException('Item não encontrado');
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    await this.itensRepository.update(id, updateItemDto);
    const updatedItem = await this.itensRepository.findOne(id);
    if (!updatedItem) throw new NotFoundException('Item não encontrado');
    return updatedItem;
  }

  async remove(id: number) {
    const deleteItem = await this.itensRepository.delete(id);
    // 'affected' checks the count of removed elements
    if (!deleteItem.affected) throw new NotFoundException('Item não encontrado');
  }
}
