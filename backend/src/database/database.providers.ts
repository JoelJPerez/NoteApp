import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Note } from 'src/notes/entities/note.entity';

export const DatabaseProvider = [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    database: process.env.POSTGRES_DB || 'notes_db',
    synchronize: true,
    entities: [Note, Category],
    // migrations: [__dirname + '../migrations/*{.ts,.js}'],
    // ssl: process.env.POSTGRES_SSL === 'true',
    // extra: {
    //   ssl:
    //     process.env.POSTGRES_SSL === 'true'
    //       ? { rejectUnauthorized: false }
    //       : null,
    // },
  }),
];
