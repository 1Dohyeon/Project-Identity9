import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Articles } from 'src/articles/articles.schema';
import { RegisterRequestDto } from 'src/auth/dtos/signup.request.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { Users } from './users.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}

  // UsersRepository는 UsersService에서만 접근 가능

  /**
   * user 생성
   */
  async create(user: RegisterRequestDto): Promise<Users> {
    return await this.userModel.create(user);
  }

  /**
   * user 삭제
   */
  async deleteUser(userId: string) {
    const user = await this.userModel.findByIdAndDelete(userId).exec();
    return user.readOnlyData;
  }

  /**
   * user 정보 업데이트
   */
  async updateInfo(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec(); // .exec() 메소드는 쿼리를 실행하고, 프로미스(Promise)를 반환하기 위해 사용됨.
    return user.readOnlyData;
  }

  /**
   * email 존재 여부 확인
   */
  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.userModel.exists({ email });
    if (result) return true;
    else return false;
  }

  /**
   * nickname 존재 여부 확인
   */
  async existsByNickname(nickname: string): Promise<boolean> {
    const result = await this.userModel.exists({ nickname });
    if (result) return true;
    else return false;
  }

  /**
   * password 없는 user 데이터 찾아줌
   */
  async findUserByIdWithoutPassword(userId: string): Promise<any | null> {
    const user = await this.userModel.findById(userId).select('-password');
    return user.readOnlyDataWithArticles;
  }

  /**
   * nickname에 맞는 user 찾아줌
   */
  async getCurrentUser(nickname: string): Promise<any | null> {
    const user = await this.userModel.findOne({ nickname });
    return user.readOnlyDataWithArticles;
  }

  /**
   * email을 통해서 user를 찾아줌(readOnlyData 사용하면 안됨..)
   */
  async findUserByEmail(email: string): Promise<any | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  /**
   * Id를 통해서 passport 정보 없는 user 객체 반환(User의 readOnlyData 활용)
   */
  async getReadOnlyData(userId: string): Promise<any | null> {
    const user = await this.userModel.findById(userId);
    return user.readOnlyData;
  }

  /**
   * user의 privateArticle 데이터 +1
   */
  async plusPrivateArticle(userId: string): Promise<any | null> {
    const user = await this.userModel.findById(userId);

    user.privateArticlesCount += 1;
    await user.save();

    return user.readOnlyDataWithArticles;
  }

  /**
   * user의 privateArticle 데이터 +1
   */
  async plusPublicArticle(userId: string): Promise<any | null> {
    const user = await this.userModel.findById(userId);

    user.publicArticlesCount += 1;
    await user.save();

    return user.readOnlyDataWithArticles;
  }

  /**
   * user의 privateArticle 데이터 -1
   */
  async minusPrivateArticle(userId: string): Promise<any | null> {
    const user = await this.userModel.findById(userId);

    user.privateArticlesCount -= 1;
    await user.save();

    return user.readOnlyDataWithArticles;
  }

  /**
   * user의 privateArticle 데이터 -1
   */
  async minusPublicArticle(userId: string): Promise<any | null> {
    const user = await this.userModel.findById(userId);

    user.publicArticlesCount -= 1;
    await user.save();

    return user.readOnlyDataWithArticles;
  }

  /**
   * user의 allArticles 데이터 업데이트
   */
  async updateAllArticles(userId: string) {
    const user = await this.userModel.findById(userId);
    user.allArticlesCount =
      user.privateArticlesCount + user.publicArticlesCount;
    await user.save();

    return user.readOnlyDataWithArticles;
  }

  /**
   * user 데이터에 publicArticles[] 추가
   */
  async addPublicArticleToUser(
    userId: string,
    newArticle: Articles,
  ): Promise<Users> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $push: { publicArticles: newArticle.withoutDescription },
        },
        { new: true },
      )
      .exec();
  }

  /**
   * user 데이터에 privateArticles[] 추가
   */
  async addPrivateArticleToUser(
    userId: string,
    newArticle: Articles,
  ): Promise<Users> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $push: { privateArticles: newArticle.withoutDescription },
        },
        { new: true },
      )
      .exec();
  }

  /**
   * user 데이터의 publicArticles에서 article 삭제
   */
  async removePublicArticleFromUser(
    userId: string,
    article: Articles,
  ): Promise<Users> {
    return await this.userModel
      .findByIdAndUpdate(
        userId,
        { $pull: { publicArticles: article.withoutDescription } },
        { new: true },
      )
      .exec();
  }

  /**
   * user 데이터의 privateArticles에서 article 삭제
   */
  async removePrivateArticleFromUser(
    userId: string,
    article: Articles,
  ): Promise<Users> {
    return await this.userModel
      .findByIdAndUpdate(
        userId,
        { $pull: { privateArticles: article.withoutDescription } },
        { new: true },
      )
      .exec();
  }
}
