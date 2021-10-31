import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-iten.dto';
import Item from './entities/item.entity';

@Injectable()
export class ItensService {
  constructor(
    @InjectRepository(Item) private itensRepository: Repository<Item>,
  ) {}

  public async create(createItemDto: CreateItemDto): Promise<Item> {
    const novoItem = this.itensRepository.create(createItemDto);
    await this.itensRepository.save(novoItem);
    return novoItem;
  }

  public findAll(): Promise<Item[]> {
    return this.itensRepository.find();
  }

  public async findOne(id: number): Promise<Item> {
    const item = await this.itensRepository.findOne(id);
    if (!item) throw new NotFoundException('Item não encontrado');
    return item;
  }

  public async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    await this.itensRepository.update(id, updateItemDto);
    const itemAtualizado = await this.itensRepository.findOne(id);
    if (!itemAtualizado) throw new NotFoundException('Item não encontrado');
    return itemAtualizado;
  }

  public async remove(id: number): Promise<void> {
    const itemRemovido = await this.itensRepository.delete(id);
    if (!itemRemovido.affected)
      throw new NotFoundException('Item não encontrado');
  }

  public async findItemsPerSelling(sellingId: number): Promise<Item[]> {
    const itens = await this.itensRepository.find({
      where: { venda: sellingId },
      select: ['nome', 'quantidade', 'valor'],
    });
    return itens;
  }
}
