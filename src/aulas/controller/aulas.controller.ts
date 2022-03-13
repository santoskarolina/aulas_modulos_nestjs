import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AulasService } from '../services/aulas.service';
import { ModuloCreateDto } from "../../modulos/dto/modulo-create.dto";
import { AulaCreateDto } from "../dto/aula-create.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt.auth.guard";

@Controller('aulas')
export class AulasController {
  constructor(private readonly aulasService: AulasService) {}

  @Get()
  find(){
    return this.aulasService.find()
  }

  @Get(':id')
  findOne(@Param('id') id: number){
    return this.aulasService.findOne(id)
  }

  @Get('reports/reports')
  reports(){
    return this.aulasService.reports()
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() aula: AulaCreateDto){
    return this.aulasService.updateOne(id, aula)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create( @Body() aula: AulaCreateDto){
    return this.aulasService.create(aula)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number){
    return this.aulasService.delete(id)
  }
}
