import { Module } from '@nestjs/common';
import { ArticlesService } from 'src/articles/service/articles.service';
import { UsersService } from 'src/users/service/users.service';
import { UserArticleInteractionService } from './user-article-interaction.service';

@Module({
  providers: [UserArticleInteractionService],
})
export class UserArticleInteractionModule {
  constructor(
    private usersService: UsersService,
    private articleServices: ArticlesService,
  ) {}
}
