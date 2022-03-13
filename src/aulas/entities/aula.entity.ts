import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Modulo } from "../../modulos/entities/modulo.entity";

@Entity({name:'aula', schema:'modulo_aulas'})
export class Aula {

  @PrimaryGeneratedColumn({type: "int"})
  aula_id: number

  @Column({type: "varchar", nullable: false, length: 255})
  nome: string

  @Column({type: "date", nullable: false})
  data_aula: Date

  @ManyToOne(type => Modulo)
  @JoinColumn({name: 'modulo_id', referencedColumnName: 'modulo_id'})
  modulo: Modulo
}