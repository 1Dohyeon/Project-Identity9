import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/users/users.repository';
import { LoginRequestDto } from '../dtos/login.request.dto';
import { SignupRequestDto } from '../dtos/signup.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  // 회원가입
  async signUp(body: SignupRequestDto) {
    const { email, password, name, nickname } = body;

    // email 중복 확인
    const isEmailExist = await this.usersRepository.existsByEmail(email);

    if (isEmailExist) {
      throw new UnauthorizedException('이미 존재하는 이메일입니다.');
    }

    // 닉네임 중복 확인
    const isNicknameExist =
      await this.usersRepository.existsByNickname(nickname);
    if (isNicknameExist) {
      throw new UnauthorizedException('이미 존재하는 닉네임입니다.');
    }

    // user 데이터 생성
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
      name,
      nickname,
    });

    return user.readOnlyData;
  }

  // 로그인
  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    // email 여부 확인
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해주세요.');
    }

    // password 일치 여부 확인
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해주세요.');
    }

    const payload = { email: email, sub: user.id };
    const returnUser = await this.usersRepository.getReadOnlyData(user.id);

    return {
      returnUser,
      token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET }),
    };
  }
}
