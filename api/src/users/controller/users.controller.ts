import {
  Controller,
  Get,
  Patch,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth.service';
import { HttpExceptionFilter } from 'src/common/exception/httpException.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { UserService } from '../service/users.service';

// 글로벌 설정 말고 데코레이터로 각 컨트롤러마다 설정 가능
@Controller('user')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // 회원가입 페이지
  @Get('register')
  registerPage() {
    return 'hello world';
  }

  // 로그인 페이지
  @Get('signin')
  signInPage() {
    return 'hello world';
  }

  // 내 프로필 페이지
  @Get(':nickname')
  getCurrentUser() {
    return 'hello world';
  }

  // 프로필 수정 페이지
  @Get(':nickname/edit')
  editInfoPage() {
    return 'hello world';
  }

  // 프로필 수정 후 프로필 페이지
  @Patch(':nickname/edit')
  editInfo() {
    return 'hello world';
  }

  // 로그아웃
  @Post()
  logout() {
    return 'hello world';
  }
}
