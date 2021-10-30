import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from 'src/clientes/clientes.module';
import { VendasModule } from 'src/vendas/vendas.module';
import { ItensModule } from 'src/itens/itens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('mysql.host'),
        port: configService.get<number>('mysql.port'),
        username: configService.get<string>('mysql.user'),
        password: configService.get<string>('mysql.password'),
        database: configService.get<string>('mysql.database'),
        autoLoadEntities: true,
      })
    }),
    ClientesModule,
    VendasModule,
    ItensModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
