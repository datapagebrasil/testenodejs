import { Module } from '@nestjs/common';
import { ItensService } from './itens.service';
import { ItensController } from './itens.controller';
import Item from './entities/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItensController],
  providers: [ItensService]
})
export class ItensModule {}
