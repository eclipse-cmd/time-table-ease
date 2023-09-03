import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class BaseService {
  public readonly SchoolSnippetSelector = {
    id: true,
    name: true,
    domainName: true,
    theme: true,
  };

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
