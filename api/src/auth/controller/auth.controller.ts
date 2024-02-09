import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestDto } from '../dtos/login.request.dto';
import { SignupRequestDto } from '../dtos/signup.request.dto';
import { AuthService } from '../service/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입 후 로그인 페이지
  @Post('/signup')
  async signUp(@Body() body: SignupRequestDto) {
    return await this.authService.signUp(body);
  }

  // 로그인 후 home 페이지
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }
}
