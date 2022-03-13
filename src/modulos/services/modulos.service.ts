import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Modulo } from "../entities/modulo.entity";
import { getConnection, Repository } from "typeorm";
import { ModuloCreateDto } from "../dto/modulo-create.dto";
import { AulasService } from "../../aulas/services/aulas.service";

@Injectable()
export class ModulosService {

  constructor(
    @InjectRepository(Modulo)
    private moduloRepository: Repository<Modulo>,
    private aulasService: AulasService
  ) {}

  find(){
    return this.moduloRepository.find()
  }

  async findOne(id: number){
    const modulo = await this.moduloRepository.findOne(id, )
    if(!modulo){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Modulo não encontrado',
        error: 'NOT_FOUND'
      }, HttpStatus.BAD_REQUEST)
    }else{
      return modulo
    }
  }

  async listarAulas(modulo_id:number){
    return this.aulasService.listarPorModulo(modulo_id)
  }

  async create(modulo: ModuloCreateDto){
    return await this.moduloRepository.save(modulo)
  }

  async delete(id: number){
    const modulo_find = await this.moduloRepository.findOne(id)
    if(!modulo_find){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Modulo não encontrado',
        error: 'NOT_FOUND'
      }, HttpStatus.BAD_REQUEST)
    }else{
      try{
        return this.moduloRepository.delete(id)
      }catch (error) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Modulo não pode ser deletado',
          error: 'DELETE'
        }, HttpStatus.BAD_REQUEST)
      }
    }
  }

  async updateOne(id:number, modulo: ModuloCreateDto){
    const modulo_find = await this.moduloRepository.findOne(id)
    if(!modulo_find){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Modulo não encontrado',
        error: 'NOT_FOUND'
      }, HttpStatus.BAD_REQUEST)
    }else{
      return await getConnection().createQueryBuilder()
        .update(Modulo)
        .set({
          nome: modulo.nome,
        })
        .where("modulo_id =:modulo_id", { modulo_id: id })
        .execute()
    }
  }

  async reports(){
    const total = await this.moduloRepository.find()
    return {"total": total.length}
  }
}
