import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsuarioModule } from "../usuario/usuario.module";
import { jwtConstants } from "./constants/constant";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
  imports: [
    forwardRef(() => UsuarioModule),
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
