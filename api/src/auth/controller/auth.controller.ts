import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginRequestDto } from '../dtos/login.request.dto';
import { RegisterRequestDto } from '../dtos/signup.request.dto';
import { AuthService } from '../service/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입 페이지
  @Get('register')
  registerPage() {
    return 'hello world';
  }

  // 회원가입 후 로그인 페이지
  @Post('register')
  async signUp(@Body() body: RegisterRequestDto) {
    return await this.authService.signUp(body);
  }

  // 로그인 페이지
  @Get('login')
  signInPage() {
    return 'hello world';
  }

  // 로그인 후 home 페이지
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }
}
