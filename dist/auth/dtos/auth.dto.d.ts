export declare class RegisterDto {
    username: string;
    email: string;
    passwordHash: string;
    fullName: string;
    profilePictureURL: string;
}
export declare class LoginDto {
    usernameOrEmail: string;
    passwordHash: string;
}
export declare class Token {
    accessToken: string;
    refreshToken?: string;
}
