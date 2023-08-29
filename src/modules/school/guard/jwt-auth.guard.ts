import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      throw new HttpException(
        {
          status: false,
          message: 'unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
