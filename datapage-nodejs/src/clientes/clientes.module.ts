import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import Cliente from './entities/cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItensModule } from 'src/itens/itens.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    ItensModule],
  controllers: [ClientesController],
  providers: [ClientesService]
})
export class ClientesModule {}
