import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulosModule } from './modulos/modulos.module';
import { AulasModule } from './aulas/aulas.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ModulosModule, AulasModule, UsuarioModule,
  TypeOrmModule.forRoot({
    url: process.env.DATABASE_URL,
    type: 'postgres',
    ssl: { rejectUnauthorized: false },
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false, // This for development,
    autoLoadEntities: true,
  }),
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
