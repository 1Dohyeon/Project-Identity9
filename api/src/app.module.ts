import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { UserArticleInteractionModule } from './user-article-interaction/user-article-interaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    ArticlesModule,
    UserArticleInteractionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // production 배포시에는 false여야함.
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;

  configure(consumer: MiddlewareConsumer) {
    // 소비자에게 LoggerMiddleware 제공, 전체 엔드포인트에 대해서 LoggerMiddleware 실행
    consumer.apply(LoggerMiddleware).forRoutes('*');
    mongoose.set('debug', this.isDev);
  }
}
