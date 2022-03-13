import { Module } from '@nestjs/common';
import { AulasService } from './services/aulas.service';
import { AulasController } from './controller/aulas.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Aula } from "./entities/aula.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Aula])],
  controllers: [AulasController],
  providers: [AulasService],
  exports: [AulasService]
})
export class AulasModule {}
