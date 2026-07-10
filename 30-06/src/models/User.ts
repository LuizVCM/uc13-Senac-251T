import { Column, Entity, OneToMany, PrimaryGeneratedColumn,  } from "typeorm";
import { Post } from "./Post";

// Precisamos sinalizar ao TypeORM que esta classe será mapeada em uma tabela
// Para fazer isso, utilizamos um decorator:
// @Entity('users) indica qur deve ser criada uma tabela com o nome 'users'
@Entity('users')
export class User{
    // PrimaryGeneratedCollumn() indica que este atributo será uma coluna com PRIMARY KEY e AUTO_INCREMENT
    @PrimaryGeneratedColumn()
    id:number;
   
    // @Column marca o atributo com uma coluna 'normal'
    // length diz qual o tamanho máximo de caracteres
    // nullable:false diz que não pode ser nula (tipo o NOT NULL)
    @Column({length:150, nullable:false})
    name:string;

    @Column({length:150, nullable:false, unique:true})
    email:string;

    @Column({ nullable:false, length: 255})
    password:string;

    // @OneToMany indica que um User pode ter vários Post
    // precisamos passar dois parâmetros:
    // () => Post -> função que retorna a entidade relacionada
    // post => post.user -> indica qual a propriedade na classe Post que referencia o User
    // Com tudo isso definido, o TypeORM consegue criart automaticamente as ligações entre as tabelas e as chaves estrangeiras.
    // Temos que fazer sem,pre para todos ops envolvidos, neste caso, tanto para User quanto para Post
    @OneToMany(() => Post, posts => posts.user)
    posts:Post[] 
}

