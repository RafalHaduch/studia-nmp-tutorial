import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './config/db.module';
import { ListsModule } from './modules/lists/lists.module';

@Module({
  imports: [AuthModule, ListsModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
