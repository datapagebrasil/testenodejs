import { Venda } from 'src/vendas/entities/venda.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clientes' })
export class Cliente {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'text' })
  nome: string;

  @Column({ type: 'varchar', default: null })
  telefone: string;

  @Column({ type: 'varchar', default: null })
  cpf: string;

  @Column({ type: 'timestamp', precision: 6, nullable: true, default: null })
  data_cadastro: Date | null;

  @Column({ type: 'timestamp', precision: 6, nullable: true, default: null })
  data_alteracao: Date | null;

  @OneToMany((type) => Venda, (venda) => venda.cliente)
  vendas: Venda[];
}

export default Cliente;
