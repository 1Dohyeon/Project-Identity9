import { Module } from '@nestjs/common';
import { ArticlesController } from './controller/articles.controller';
import { ArticlesService } from './service/articles.service';

@Module({
  providers: [ArticlesService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
