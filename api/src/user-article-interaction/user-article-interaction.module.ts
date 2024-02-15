import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { UserArticleInteractionService } from './user-article-interaction.service';

@Module({
  imports: [UsersModule],
  providers: [UserArticleInteractionService],
  exports: [UserArticleInteractionService],
})
export class UserArticleInteractionModule {}
