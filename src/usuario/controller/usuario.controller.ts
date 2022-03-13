import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UsuarioService } from '../services/usuario.service';
import { UsuarioCreateDto } from "../dto/usuario-create.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt.auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() usuario: UsuarioCreateDto){
    return this.usuarioService.create(usuario)
  }

  @Get()
  find(){
    return this.usuarioService.find()
  }

  @Delete(':id')
  delete(@Param('id') id: number){
    return this.usuarioService.delete(id)
  }
}
