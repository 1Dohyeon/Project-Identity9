import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupRequestDto } from 'src/auth/dtos/signup.request.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { User } from './users.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // 계정 삭제
  async deleteUser(id: string) {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    return user.readOnlyData;
  }

  // 마이페이지 업데이트
  async updateInfo(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec(); // .exec() 메소드는 쿼리를 실행하고, 프로미스(Promise)를 반환하기 위해 사용됨.
    return user.readOnlyData;
  }

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

  // Id를 통해서 password 정보 없는 user 객체 반환
  async findUserByIdWithoutPassword(userId: string): Promise<any | null> {
    const user = await this.userModel.findById(userId).select('-password');
    return user.readOnlyData;
  }

  // nickname을 통해서 user를 찾아줌
  async getCurrentUser(nickname: string): Promise<any | null> {
    const user = await this.userModel.findOne({ nickname });
    return user.readOnlyDataWithArticles;
  }

  // email을 통해서 user를 찾아줌(readOnlyData 사용하면 안됨..)
  async findUserByEmail(email: string): Promise<any | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  // Id를 통해서 passport 정보 없는 user 객체 반환(User의 readOnlyData 활용)
  async getReadOnlyData(id: string): Promise<any | null> {
    const user = await this.userModel.findById(id);
    return user.readOnlyData;
  }

  async plusPrivateArticle(id: string): Promise<any | null> {
    const user = await this.userModel.findById(id);

    user.privateArticlesCount += 1;
    await user.save();

    return user.readOnlyDataWithArticles;
  }

  async minusPrivateArticle(id: string): Promise<any | null> {
    const user = await this.userModel.findById(id);

    user.privateArticlesCount -= 1;
    await user.save();

    return user.readOnlyDataWithArticles;
  }
}
