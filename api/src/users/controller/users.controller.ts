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
import { UsersService } from '../service/users.service';

// 글로벌 설정 말고 데코레이터로 각 컨트롤러마다 설정 가능
@Controller('user')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 닉네임 사용자 페이지
  @Get(':nickname')
  getCurrentUser(@Param('nickname') nickname: string) {
    return this.usersService.getCurrentUser(nickname);
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
  updateInfo(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateInfo(userId, updateUserDto);
  }

  // 이 아래부터는 authService 로 옮길 예정
  // 로그아웃
  @Post()
  logout() {
    return 'hello world';
  }

  // 계정 삭제
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
