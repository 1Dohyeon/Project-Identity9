import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { HttpExceptionFilter } from 'src/common/exception/httpException.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import { UserService } from '../service/users.service';

// 글로벌 설정 말고 데코레이터로 각 컨트롤러마다 설정 가능
@Controller('user')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 내 프로필 페이지
  @Get(':nickname')
  getCurrentUser(@Param('nickname') nickname: string) {
    return this.userService.getCurrentUser(nickname);
  }

  // 프로필 수정 페이지
  @UseGuards(JwtAuthGuard)
  @Get(':nickname/update')
  updataInfoPage() {
    return 'hello world';
  }

  // 프로필 수정 후 프로필 페이지
  @UseGuards(JwtAuthGuard)
  @Patch(':id/update')
  updataInfo(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateInfo(id, updateUserDto);
  }

  // 로그아웃
  @Post()
  logout() {
    return 'hello world';
  }

  // 계정 삭제
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
