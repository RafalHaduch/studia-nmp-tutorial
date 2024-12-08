import { Module } from '@nestjs/common';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.serivces';
import { ListsRepository } from './repositories';

@Module({
  imports: [],
  controllers: [ListsController],
  providers: [ListsService, ListsRepository],
})
export class ListsModule {}
