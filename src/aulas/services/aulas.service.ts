import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Aula } from "../entities/aula.entity";
import { Repository, getConnection } from "typeorm";
import { AulaCreateDto } from "../dto/aula-create.dto";

@Injectable()
export class AulasService {

  constructor(
    @InjectRepository(Aula)
    private aulaRepository: Repository<Aula>
  ) { }

  find(){
    return this.aulaRepository.find({relations: ['modulo']})
  }

  async findOne(id: number){
    const aula = await this.aulaRepository.findOne(id, {
      relations: ['modulo']
    })
    if(!aula){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Aula não encontrada',
        error: 'NOT_FOUND'
      }, HttpStatus.BAD_REQUEST)
    }else{
      return aula
    }
  }

  async listarPorModulo(modulo_id:number){
    return this.aulaRepository.find({
      where: {
        modulo: modulo_id
      }
    })
  }

  async create(aula: AulaCreateDto){
    const new_aula = await this.aulaRepository.save(aula)
    return new_aula
  }

  async delete(id: number){
    const aula_find = await this.aulaRepository.findOne(id)
    if(!aula_find){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Aula não encontrada',
        error: 'NOT_FOUND'
      }, HttpStatus.BAD_REQUEST)
    }else{
      try{
        return this.aulaRepository.delete(id)
      }catch (error) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Aula não pode ser deletada',
          error: 'DELETE'
        }, HttpStatus.BAD_REQUEST)
      }
    }
  }

  async updateOne(id:number, aula: AulaCreateDto){
    const aula_find = await this.aulaRepository.findOne(id)
    if(!aula_find){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Aula não encontrada',
        error: 'NOT_FOUND'
      }, HttpStatus.BAD_REQUEST)
    }else{
      const aula_update = await getConnection().createQueryBuilder()
        .update(Aula)
        .set({
          nome: aula.nome,
          data_aula: aula.data_aula,
          modulo: aula.modulo
        })
        .where("aula_id =:aula_id",  {aula_id: id})
        .execute()
      return aula_update
    }
  }

  async reports(){
    const total = await this.aulaRepository.find()
    return {"total": total.length}
  }
}
