import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.services';
import { RegisterDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dtoRegister: RegisterDto) {
    return this.authService.register(dtoRegister);
  }

  @Post('login')
  async login(@Body() dtoLogin: LoginDto) {
    return this.authService.login(dtoLogin);
  }
}
