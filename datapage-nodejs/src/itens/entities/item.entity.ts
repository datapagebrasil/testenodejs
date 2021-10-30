import Venda from "src/vendas/entities/venda.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'vendas_itens'})
export class Item {
    @PrimaryGeneratedColumn({unsigned: true})
    id: number;

    @Column({type: 'varchar', length: 255 , default: null})
    nome: string;

    @Column({type: 'decimal', precision: 10, scale: 2, default: null})
    valor: string;

    @Column({type: 'int', width: 10, default: null})
    quantidade: number;

    // @Column({name: 'venda_id', type: 'int', width: 11})
    // vendaId: number;

    @ManyToOne(type => Venda, venda => venda.itens)
    @JoinColumn({name: 'venda_id'})
    venda: Venda;
}

export default Item;