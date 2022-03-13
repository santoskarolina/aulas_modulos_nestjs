import { Module } from '@nestjs/common';
import { ModulosService } from './services/modulos.service';
import { ModulosController } from './controller/modulos.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Modulo } from "./entities/modulo.entity";
import { AulasModule } from "../aulas/aulas.module";

@Module({
  imports: [TypeOrmModule.forFeature([Modulo]), AulasModule],
  controllers: [ModulosController],
  providers: [ModulosService],
})
export class ModulosModule {}
