import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRequestDto } from '../dtos/users.request.dto';
import { UsersRepository } from '../users.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // 회원가입
  async signUp(body: UserRequestDto) {
    const { email, password, name, nickname } = body;

    // email 중복 확인
    const isUserExist = await this.usersRepository.existsByEmail(email);

    if (isUserExist) {
      throw new UnauthorizedException('해당하는 사용자는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // user 데이터 생성
    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
      name,
      nickname,
    });

    return user.readOnlyData;
  }
}
