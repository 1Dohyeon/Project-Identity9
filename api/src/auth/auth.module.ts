import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ArticlesModule } from 'src/articles/articles.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),

    forwardRef(() => UsersModule),
    forwardRef(() => ArticlesModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
