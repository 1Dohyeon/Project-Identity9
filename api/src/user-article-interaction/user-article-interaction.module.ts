import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ArticlesModule } from 'src/articles/articles.module';
import { UsersModule } from 'src/users/users.module';
import { UserArticleInteractionController } from './user-article-interaction.controller';
import { UserArticleInteractionService } from './user-article-interaction.service';

@Module({
  imports: [
    UsersModule,
    ArticlesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserArticleInteractionController],
  providers: [UserArticleInteractionService],
  exports: [UserArticleInteractionService],
})
export class UserArticleInteractionModule {}
