import { EntityRepository, Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@EntityRepository(Category)
export class NoteRepository extends Repository<Category> {}
