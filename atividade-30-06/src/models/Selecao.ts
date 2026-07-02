import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('selecoes')

export class Selecao {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length: 150, nullable:true})
    nome:string;

    @Column({length:50, nullable:true})
    pais:string;

    @Column({length: 150, nullable:true})
    tecnico:string;

    @Column({length:1000, nullable:true, unique:true})
    rankingFila: number;

    @Column({length:4, nullable:true})
    anoFundacao: number

}