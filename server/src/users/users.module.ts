import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './controller/users.controller';
import { UserService } from './service/users.service';
import { UsersRepository } from './users.repository';
import { User, UserSchema } from './users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    // 순환 모듈 문제 해결을 위해서 forwardRef 사용
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, UsersRepository],
  exports: [UserService, UsersRepository], // providers만 있다면 캡슐화 되어 외부에서 사용 못함. 아래처럼 export 해줘야함.
})
export class UsersModule {}
