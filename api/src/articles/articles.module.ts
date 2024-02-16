import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesRepository } from './articles.repository';
import { Articles, ArticlesSchema } from './articles.schema';
import { ArticlesController } from './controller/articles.controller';
import { ArticlesService } from './service/articles.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Articles.name, schema: ArticlesSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesRepository],
  exports: [ArticlesService, ArticlesRepository],
})
export class ArticlesModule {}
