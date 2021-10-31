import Cliente from 'src/clientes/entities/cliente.entity';
import Item from 'src/itens/entities/item.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'vendas' })
export class Venda {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255, default: null })
  codigo_nota_fiscal: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: null })
  valor_pago: string;

  @Column({ type: 'datetime', default: null })
  data_cadastro: Date;

  @Column({ type: 'datetime', default: null })
  data_atualizado: Date;

  @ManyToOne((type) => Cliente, (cliente) => cliente.vendas)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @OneToMany((type) => Item, (item) => item.venda)
  itens: Item[];
}

export default Venda;
