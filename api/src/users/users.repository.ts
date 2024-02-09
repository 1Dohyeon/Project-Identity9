import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupRequestDto } from 'src/auth/dtos/signup.request.dto';
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

  // nickname 중복 확인
  async existsByNickname(nickname: string): Promise<boolean> {
    const result = await this.userModel.exists({ nickname });
    if (result) return true;
    else return false;
  }

  // user 데이터 생성
  async create(user: SignupRequestDto): Promise<User> {
    return await this.userModel.create(user);
  }

  // Id를 통해서 passport 정보 없는 user 객체 반환
  async findUserByIdWithoutPassword(userId: string): Promise<User | null> {
    const user = await this.userModel.findById(userId).select('-password');
    return user;
  }

  // email을 통해서 user를 찾아줌
  async findUserByEmail(email: string): Promise<User | null> {
    // email 필드만 가진 객체
    const user = await this.userModel.findOne({ email });
    return user;
  }

  // Id를 통해서 passport 정보 없는 user 객체 반환(User의 readOnlyData 활용)
  async getReadOnlyData(id: string) {
    const user = await this.userModel.findById(id);
    return user.readOnlyData;
  }
}
