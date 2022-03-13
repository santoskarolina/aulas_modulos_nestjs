import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'usuario', schema: 'modulo_aulas'})
export class Usuario {

  @PrimaryGeneratedColumn({type: 'int'})
  usuario_id: number

  @Column({type: "varchar", nullable: false, length: 255})
  nome: string

  @Column({type: "varchar", nullable: false, length: 255})
  email:string

  @Column({type: "varchar", nullable: false, length: 255})
  senha:string
}