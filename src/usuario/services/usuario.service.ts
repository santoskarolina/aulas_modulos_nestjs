import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Repository } from "typeorm";
import { UsuarioCreateDto } from "../dto/usuario-create.dto";
import * as crypto from 'crypto';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>
  ) {}

  async create(usuario: UsuarioCreateDto){
    const usuario_find = await this.usuarioRepository.findOne({
      where: {
        email: usuario.email
      }
    })
    if(usuario_find){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Email já cadastrado',
        error: 'email'
      }, HttpStatus.BAD_REQUEST)
    }else{
      usuario.senha =  crypto.createHmac('sha256', usuario.senha).digest('hex');
      return this.usuarioRepository.save(usuario)
    }
  }

  find(){
    return this.usuarioRepository.find()
  }

  async delete(id: number){
    const user = await this.usuarioRepository.findOne(id)
    if(!user){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Usuário não encontrado',
        error: 'not_found'
      }, HttpStatus.BAD_REQUEST)
    }else{
      return await this.usuarioRepository.delete(id)
    }
  }

  findByEmail(email:string){
    return this.usuarioRepository.findOne({
      where: {
        email: email
      }
    })
  }
}
