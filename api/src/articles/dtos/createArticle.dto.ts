import { PickType } from '@nestjs/swagger';
import { Article } from '../articles.schema';

export class CreateArticleDto extends PickType(Article, [
  'title',
  'description',
]) {}
