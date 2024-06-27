import { Controller, Post, Body, Headers } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto, Token } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { isPublic } from 'src/decorator/public.decorator';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @isPublic()
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  register(@Body() body: RegisterDto): Promise<Partial<User>> {
    return this.authService.register(body);
  }

  @Post('refresh')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Token successfully refreshed',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  refreshToken(
    @Headers('authorization') authorization: string,
  ): Promise<Token> {
    return this.authService.refresh(authorization);
  }

  @Post('login')
  @isPublic()
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  login(@Body() body: LoginDto): Promise<Token> {
    return this.authService.login(body);
  }
}
