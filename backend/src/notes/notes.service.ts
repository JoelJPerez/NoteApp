import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const { title, content, archived, categoriesIds } = createNoteDto;
    const newNote = new Note();
    newNote.title = title;
    newNote.content = content;
    newNote.archived = archived;

    const categoriesToFind = categoriesIds;
    const categories = await this.categoriesRepository.findBy({
      id: In(categoriesToFind),
    });

    newNote.categories = categories;

    return this.notesRepository.save(newNote);
  }

  findAll(isArchived: boolean, filterName: string): Promise<Note[]> {
    if (filterName === 'default') {
      return this.notesRepository.find({
        where: {
          archived: isArchived,
        },
        relations: {
          categories: true,
        },
      });
    } else {
      return this.notesRepository.find({
        where: {
          archived: isArchived,
          categories: {
            name: filterName,
          },
        },
        relations: {
          categories: true,
        },
      });
    }
  }

  findOne(id: number) {
    return this.notesRepository.find({
      where: {
        id,
      },
      relations: {
        categories: true,
      },
    });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const { title, content, archived, categoriesIds } = updateNoteDto;
    if (!title) {
      return this.notesRepository.update(id, updateNoteDto);
    } else {
      const updateNote = new Note();
      updateNote.title = title;
      updateNote.content = content;
      updateNote.archived = archived;

      const categoriesToFind = categoriesIds;

      const categories = await this.categoriesRepository.findBy({
        id: In(categoriesToFind),
      });

      updateNote.categories = categories;

      const entityName = await this.notesRepository.findOneBy({ id });

      Object.assign(entityName, updateNote);

      return this.notesRepository.save(entityName);
    }
  }

  remove(id: number) {
    return this.notesRepository.delete(id);
  }
}
