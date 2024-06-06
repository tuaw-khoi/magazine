import { Controller, Post, Body, Headers } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto, Token } from './dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto): Promise<Partial<User>> {
    return this.authService.register(body);
  }

  @Post('refresh')
  refreshToken(
    @Headers('authorization') authorization: string,
  ): Promise<Token> {
    return this.authService.refresh(authorization);
  }
  @Post('login')
  login(@Body() body: LoginDto): Promise<Token> {
    return this.authService.login(body);
  }
}
