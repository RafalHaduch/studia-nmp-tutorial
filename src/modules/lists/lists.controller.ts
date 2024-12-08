import { Controller, Post, Get, Body } from '@nestjs/common';
import { ListsService } from './lists.serivces';
import {
  CreateNewListDto,
  DeleteListDto,
  ModifyListDto,
  ContentListDto,
} from './dto';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post('create')
  async createNewList(@Body() dtoCreate: CreateNewListDto) {
    return this.listsService.create(dtoCreate);
  }

  @Post('delete')
  async deleteList(@Body() dtoDelete: DeleteListDto) {
    return this.listsService.delete(dtoDelete);
  }

  @Post('modify')
  async modifyList(@Body() dtoModify: ModifyListDto) {
    return this.listsService.modify(dtoModify);
  }

  @Get('content')
  async contentList(@Body() dtoContent: ContentListDto) {
    return this.listsService.content(dtoContent);
  }
}
