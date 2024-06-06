import { User } from '@prisma/client';
import { LoginDto, RegisterDto, Token } from './dtos/auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<Partial<User>>;
    refreshToken(authorization: string): Promise<Token>;
    login(body: LoginDto): Promise<Token>;
}
