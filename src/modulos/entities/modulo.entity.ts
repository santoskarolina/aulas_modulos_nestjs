import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Aula } from "../../aulas/entities/aula.entity";

@Entity({name:'modulo', schema:'modulo_aulas'})
export class Modulo {

  @PrimaryGeneratedColumn({type: "int"})
  modulo_id: number

  @Column({type: "varchar", nullable: false, length: 255})
  nome: string

  @OneToMany(type => Aula, aula => aula.modulo)
  aulas: Aula[]
}