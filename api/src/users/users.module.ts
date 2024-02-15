import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { UserSchema, Users } from './users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // providers만 있다면 캡슐화 되어 외부에서 사용 못함. 아래처럼 export 해줘야함.
})
export class UsersModule {}
