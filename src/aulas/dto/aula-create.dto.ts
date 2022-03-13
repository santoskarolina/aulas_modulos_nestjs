import { Modulo } from "../../modulos/entities/modulo.entity";

export class AulaCreateDto {
  nome: string
  data_aula:Date
  modulo: Modulo
}