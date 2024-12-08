import { IsString, IsNotEmpty, ValidateIf, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // Dodanie metody do porównania haseł
  @ValidateIf((o) => o.password)
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
  )
  confirm_password: string;

  // Walidacja porównania hasła
  validatePasswordMatch(): boolean {
    return this.password === this.confirm_password;
  }
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
