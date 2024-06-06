import {
  IsEmail,
  IsNotEmpty,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';
export class RegisterDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  passwordHash: string;

  @MinLength(2)
  fullName: string;

  @IsUrl()
  profilePictureURL: string;
}

export class LoginDto {
  @IsNotEmpty()
  usernameOrEmail: string;

  @MinLength(6)
  passwordHash: string;
}
export class Token {
  accessToken: string;
  refreshToken?: string;
}
