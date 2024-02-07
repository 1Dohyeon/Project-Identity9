import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 메인 페이지
  @Get()
  getHello() {
    return 'hello world';
  }
}
