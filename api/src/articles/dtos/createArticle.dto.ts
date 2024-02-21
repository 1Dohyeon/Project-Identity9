import { PickType } from '@nestjs/swagger';
import { Articles } from '../articles.schema';

export class CreateArticleDto extends PickType(Articles, [
  'authorId',
  'status',
  'title',
  'description',
  'mainImg',
]) {}
