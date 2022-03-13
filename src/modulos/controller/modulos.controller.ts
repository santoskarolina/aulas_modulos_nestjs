import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ModulosService } from '../services/modulos.service';
import { ModuloCreateDto } from "../dto/modulo-create.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt.auth.guard";

@Controller('modulos')
export class ModulosController {
  constructor(private readonly modulosService: ModulosService) {}

  @Get()
  find(){
    return this.modulosService.find()
  }

  @Get(':id')
  findOne(@Param('id') id: number){
    return this.modulosService.findOne(id)
  }

  @Get('reports/reports')
  reports(){
    return this.modulosService.reports()
  }

  @Get('aulas/:id')
  findClass(@Param('id') id: number){
    return this.modulosService.listarAulas(id)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() modulo: ModuloCreateDto){
    return this.modulosService.updateOne(id, modulo)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() modulo: ModuloCreateDto){
    return this.modulosService.create(modulo)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number){
    return this.modulosService.delete(id)
  }
}
