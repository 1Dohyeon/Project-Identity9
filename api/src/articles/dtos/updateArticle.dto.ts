import { PickType } from '@nestjs/swagger';
import { Articles } from '../articles.schema';

export class UpdateArticleDto extends PickType(Articles, [
  'status',
  'title',
  'description',
]) {}
