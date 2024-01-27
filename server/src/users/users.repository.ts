import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRequestDto } from './dtos/users.request.dto';
import { User } from './users.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // email 중복 확인
  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.userModel.exists({ email });
    if (result) return true;
    else return false;
  }

  // user 데이터 생성
  async create(user: UserRequestDto): Promise<User> {
    return await this.userModel.create(user);
  }
}
