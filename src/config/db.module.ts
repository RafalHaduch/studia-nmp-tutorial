import { Module, Global } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        // Konfiguracja połączenia z bazą danych
        const pool = await mysql.createPool({
          host: 'localhost', // Adres serwera bazy danych
          user: 'root', // Domyślny użytkownik dla XAMPP
          database: 'my_lists', // Nazwa bazy danych
          password: '', // Domyślne hasło dla root w XAMPP jest puste
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });
        return pool;
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
