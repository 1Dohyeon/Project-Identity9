import { Controller, Get, Patch, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';

// 글로벌 설정 말고 데코레이터로 각 컨트롤러마다 설정 가능
// @UseFilters(HttpExceptionFilter)
// @UseInterceptors(SuccessInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입 페이지
  @Get('signup')
  signUpPage() {
    return 'hello world';
  }

  // 회원가입 후 로그인 페이지
  @Post('signup')
  async signUp() {
    return await 'hello world';
  }

  // 로그인 페이지
  @Get('login')
  loginPage() {
    return 'hello world';
  }

  // 로그인 후 home 페이지
  @Post('login')
  logIn() {
    return 'hello world';
  }

  // 로그인 되어있는 user 정보 페이지 (마이페이지)
  @Get(':nickname')
  getCurrentUser() {
    return 'hello world';
  }

  // 정보 수정 페이지
  @Patch('edit')
  editInfo() {
    return 'hello world';
  }
}
