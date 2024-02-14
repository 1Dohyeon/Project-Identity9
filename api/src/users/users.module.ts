import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from 'src/articles/articles.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { UsersRepository } from './users.repository';
import { UserSchema, Users } from './users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),

    // 순환 모듈 문제 해결을 위해서 forwardRef 사용
    forwardRef(() => AuthModule),
    forwardRef(() => ArticlesModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository], // providers만 있다면 캡슐화 되어 외부에서 사용 못함. 아래처럼 export 해줘야함.
})
export class UsersModule {}
