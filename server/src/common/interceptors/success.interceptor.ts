import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // controller 이전
    // console.log('before...');

    // controller 이후
    return next.handle().pipe(
      // rxjs 의 라이브러리의 map 메서드를 이용하여 data를 객체형태로 만듦
      map((data) => ({
        success: true,
        data,
      })),
    );
  }
}
