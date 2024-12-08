import { Injectable } from '@nestjs/common';
import { AuthRepository } from './repositories';
import { RegisterDto, LoginDto } from './dto';
import * as bcrypt from 'bcrypt'; // Import bcrypt
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(dto: RegisterDto) {
    const { email, password } = dto;

    if (password !== dto.confirm_password) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Passwords do not match',
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 to liczba rund haszowania

    const isRegistered = await this.authRepository.register(
      email,
      hashedPassword,
    );

    if (isRegistered) {
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Account created successfully',
      };
    } else {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create account',
      };
    }
  }
  async login(dtoLogin: LoginDto) {
    const { email, password } = dtoLogin;

    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      };
    }

    // Pobranie list użytkownika po udanym logowaniu
    const userLists = await this.authRepository.getUserLists(user.id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      user_id: user.id,
      user_lists: userLists, // Zwróć dane o listach użytkownika
    };
  }
}
