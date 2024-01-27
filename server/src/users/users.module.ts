import { Module } from '@nestjs/common';
import { UserController } from './controller/users.controller';
import { UserService } from './service/users.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
