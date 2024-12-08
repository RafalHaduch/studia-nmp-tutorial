import { Injectable, Inject } from '@nestjs/common';
import { ListsQueries } from './sql';

@Injectable()
export class ListsRepository {
  constructor(@Inject('DATABASE_CONNECTION') private connection: any) {}

  async createList(userId: number, name: string, content: string) {
    try {
      // Wstawienie nowego rekordu do tabeli `lists`
      const result = await this.connection.execute(ListsQueries.createList, [
        userId,
        name,
        content,
      ]);

      // Jeśli operacja zakończy się powodzeniem, zwróć true
      return result[0].affectedRows > 0;
    } catch (error) {
      console.error(error);
      return false; // Jeśli coś pójdzie nie tak, zwróć false
    }
  }
  async deleteList(user_id: number, list_id: number) {
    try {
      const result = await this.connection.execute(ListsQueries.deleteList, [
        user_id,
        list_id,
      ]);
      return result[0].affectedRows > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async modifyList(
    user_id: number,
    list_id: number,
    name?: string,
    content?: string,
  ) {
    try {
      const result = await this.connection.execute(ListsQueries.modifyList, [
        name,
        content,
        user_id,
        list_id,
      ]);
      return result[0].affectedRows > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async getListContent(user_id: number, list_id: number) {
    try {
      const [rows] = await this.connection.execute(
        ListsQueries.getListContent,
        [user_id, list_id],
      );
      return rows[0] || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
