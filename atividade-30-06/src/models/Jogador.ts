import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('jogadores')
export class Jogador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150, nullable: false})
    nome: string;

    @Column({length:2, nullable:false, unique:true})
    numeroCamisa: number;

    @Column({length:50, nullable:true})
    posicao: string;

    @Column({length:3, nullable:false})
    idade: number;

    @Column({length:10, nullable:true})
    altura: number;

    @Column({length:1000, nullable:true})
    peso: number;

    @Column({length: 100, nullable:true})
    gols: number;
}