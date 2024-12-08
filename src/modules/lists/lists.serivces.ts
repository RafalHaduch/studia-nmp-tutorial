import { Injectable } from '@nestjs/common';
import { ListsRepository } from './repositories';
import {
  CreateNewListDto,
  DeleteListDto,
  ModifyListDto,
  ContentListDto,
} from './dto';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class ListsService {
  constructor(private readonly listsRepository: ListsRepository) {}

  async create(dtoCreate: CreateNewListDto) {
    const { user_id, name, content } = dtoCreate;
    const isCreated = await this.listsRepository.createList(
      user_id,
      name,
      content,
    );

    if (isCreated) {
      return {
        statusCode: HttpStatus.CREATED,
        message: 'List created successfully',
      };
    } else {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create list',
      };
    }
  }

  async delete(dtoDelete: DeleteListDto) {
    const { user_id, list_id } = dtoDelete;
    const isDeleted = await this.listsRepository.deleteList(user_id, list_id);

    if (isDeleted) {
      return {
        statusCode: HttpStatus.OK,
        message: 'List deleted successfully',
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'List not found or delete failed',
      };
    }
  }
  async modify(dtoModify: ModifyListDto) {
    const { user_id, list_id, name, content } = dtoModify;
    const isModified = await this.listsRepository.modifyList(
      user_id,
      list_id,
      name,
      content,
    );

    if (isModified) {
      return {
        statusCode: HttpStatus.OK,
        message: 'List modified successfully',
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'List not found or modify failed',
      };
    }
  }
  async content(dtoContent: ContentListDto) {
    const { user_id, list_id } = dtoContent;
    const content = await this.listsRepository.getListContent(user_id, list_id);

    if (content) {
      return {
        statusCode: HttpStatus.OK,
        data: content,
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'List not found',
      };
    }
  }
}
