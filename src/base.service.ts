import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class BaseService {
  Error(error: any, status = HttpStatus.BAD_REQUEST) {
    throw new HttpException(
      {
        message: error.message,
        cause: error,
      },
      status,
    );
  }
}
