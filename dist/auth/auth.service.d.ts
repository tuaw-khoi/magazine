import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto, Token } from './dtos/auth.dto';
import { User } from '@prisma/client';
export declare class AuthService {
    private prismaService;
    private jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    register(userData: RegisterDto): Promise<Partial<User>>;
    login(data: LoginDto): Promise<Token>;
    refresh(authorization: any): Promise<Token>;
}
