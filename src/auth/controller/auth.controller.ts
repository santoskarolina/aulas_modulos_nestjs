import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from "../guards/local.auth.guard";
import { UserLogin } from "../dto/usuario-login.dto";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user: UserLogin){
    return this.authService.login(user)
  }
}
