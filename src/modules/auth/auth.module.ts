import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';
import { AuthRepository } from './repositories';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
