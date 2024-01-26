import { Controller } from '@nestjs/common';

// 글로벌 설정 말고 데코레이터로 각 컨트롤러마다 설정 가능
// @UseFilters(HttpExceptionFilter)
// @UseInterceptors(SuccessInterceptor)
@Controller('user')
export class UserController {}
