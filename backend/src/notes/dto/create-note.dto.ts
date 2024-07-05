import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsBoolean()
  archived: boolean;

  categoriesIds: [];
}
