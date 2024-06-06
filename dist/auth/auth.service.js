"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt_1 = require("bcrypt");
let AuthService = class AuthService {
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    async register(userData) {
        const user = await this.prismaService.user.findUnique({
            where: { email: userData.email },
        });
        if (user) {
            throw new common_1.HttpException({ message: 'This email has been used.' }, common_1.HttpStatus.BAD_REQUEST);
        }
        const password = await (0, bcrypt_1.hash)(userData.passwordHash, 10);
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
    async login(data) {
        let user = await this.prismaService.user.findFirst({
            where: {
                OR: [
                    { email: data.usernameOrEmail },
                    { username: data.usernameOrEmail },
                ],
            },
        });
        if (!user) {
            throw new common_1.HttpException({ message: 'Account does not exist.' }, common_1.HttpStatus.UNAUTHORIZED);
        }
        const isPasswordValid = await (0, bcrypt_1.compare)(data.passwordHash, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.HttpException({ message: 'Password does not correct.' }, common_1.HttpStatus.UNAUTHORIZED);
        }
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
    async refresh(authorization) {
        if (!authorization) {
            throw new common_1.HttpException('Refresh token is missing', common_1.HttpStatus.BAD_REQUEST);
        }
        let payload = null;
        try {
            payload = this.jwtService.verify(authorization.refreshToken, {
                secret: process.env.REFRESH_TOKEN_KEY,
            });
        }
        catch (e) {
            throw new common_1.HttpException('Invalid refresh token', common_1.HttpStatus.UNAUTHORIZED);
        }
        const newAccessToken = this.jwtService.sign({
            id: payload.id,
            name: payload.name,
            email: payload.email,
        }, {
            secret: process.env.ACCESS_TOKEN_KEY,
            expiresIn: '1h',
        });
        return { accessToken: newAccessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map