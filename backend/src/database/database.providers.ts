import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Note } from 'src/notes/entities/note.entity';

export const DatabaseProvider = [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    entities: [Note, Category],
    migrations: [__dirname + '../migrations/*{.ts,.js}'],
    ssl: process.env.POSTGRES_SSL === 'true',
    extra: {
      ssl:
        process.env.POSTGRES_SSL === 'true'
          ? { rejectUnauthorized: false }
          : null,
    },
  }),
];
