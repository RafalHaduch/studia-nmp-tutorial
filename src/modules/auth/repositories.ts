import { Injectable, Inject } from '@nestjs/common';
import { AuthQueries } from './sql';

@Injectable()
export class AuthRepository {
  constructor(@Inject('DATABASE_CONNECTION') private connection: any) {}

  async register(email: string, password: string) {
    try {
      // Wstawienie nowego rekordu do bazy danych
      const result = await this.connection.execute(AuthQueries.register, [
        email,
        password,
      ]);

      // Jeśli operacja zakończy się powodzeniem, zwróć true
      return result[0].affectedRows > 0;
    } catch (error) {
      console.error(error);
      return false; // Jeśli coś poszło nie tak, zwróć false
    }
  }
  async findByEmail(email: string) {
    try {
      // Pobranie użytkownika z bazy danych na podstawie e-maila
      const [rows] = await this.connection.execute(AuthQueries.findByEmail, [
        email,
      ]);

      // Zwracamy pierwszy użytkownik (jeśli istnieje)
      return rows[0] || null; // Jeśli użytkownik nie istnieje, zwróci null
    } catch (error) {
      console.error(error);
      return null; // Jeśli coś poszło nie tak, zwróci null
    }
  }
  async getUserLists(userId: number) {
    try {
      const [rows] = await this.connection.execute(AuthQueries.getUserLists, [
        userId,
      ]);
      return rows; // Zwróci wszystkie rekordy z tabeli lists dla danego id_user
    } catch (error) {
      console.error(error);
      return []; // Jeśli coś pójdzie nie tak, zwróci pustą tablicę
    }
  }
}
