import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ArticleRepository } from './articles.repository';
import { Article, ArticleSchema } from './articles.schema';
import { ArticlesController } from './controller/articles.controller';
import { ArticlesService } from './service/articles.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(() => AuthModule),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticleRepository],
  exports: [ArticlesService, ArticleRepository],
})
export class ArticlesModule {}
