import { Module } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { VendasController } from './vendas.controller';
import Venda from './entities/venda.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Venda])],
  controllers: [VendasController],
  providers: [VendasService]
})
export class VendasModule {}
