import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto, Token } from './dtos/auth.dto';
import { User } from '@prisma/client';
import { hash, compare } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(userData: RegisterDto): Promise<Partial<User>> {
    // Step 1: Checking if email has already been used
    const user = await this.prismaService.user.findUnique({
      where: { email: userData.email },
    });

    if (user) {
      throw new HttpException(
        { message: 'This email has been used.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Step 2: Hash password and store to db
    const password = await hash(userData.passwordHash, 10);

    const newUser = await this.prismaService.user.create({
      data: { ...userData, passwordHash: password },
    });
    const returnData = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };

    return returnData;
  }

  async login(data: LoginDto): Promise<Token> {
    // Step 1: Finding user by email or username
    let user = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { email: data.usernameOrEmail },
          { username: data.usernameOrEmail },
        ],
      },
    });
    if (!user) {
      throw new HttpException(
        { message: 'Account does not exist.' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Step 2: Check password
    const isPasswordValid = await compare(data.passwordHash, user.passwordHash);

    if (!isPasswordValid) {
      throw new HttpException(
        { message: 'Password does not correct.' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Step 3: Generate access token and refresh token
    const payload = { id: user.id, name: user.fullName, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: '1h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
  async refresh(authorization): Promise<Token> {
    if (!authorization) {
      throw new HttpException(
        'Refresh token is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    let payload = null;
    try {
      payload = this.jwtService.verify(authorization.refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (e) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }

    const newAccessToken = this.jwtService.sign(
      {
        id: payload.id,
        name: payload.name,
        email: payload.email,
      },
      {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: '1h',
      },
    );

    return { accessToken: newAccessToken };
  }
}
