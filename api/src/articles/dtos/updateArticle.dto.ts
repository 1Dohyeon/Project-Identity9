import { PickType } from '@nestjs/swagger';
import { Article } from '../articles.schema';

export class UpdateArticleDto extends PickType(Article, [
  'status',
  'title',
  'description',
]) {}
