import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private httpAdapterHost: HttpAdapterHost, private configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ENV = this.configService.get<string>('ENV');

    const { httpAdapter } = this.httpAdapterHost,
      ctx = host.switchToHttp(),
      httpStatus = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

    //log error
    this.logger.error(`Exception: ${exception.message},\nStatus: ${httpStatus}`);

    const msg = exception.message || 'Bad request',
      statusCode = msg.includes('database') ? HttpStatus.INTERNAL_SERVER_ERROR : httpStatus;

    //reply
    httpAdapter.reply(
      ctx.getResponse(),
      {
        status: false,
        message: msg.includes('prisma') ? 'An internal server error occurred' : msg,
        stackTrace: ENV === 'dev' ? msg : undefined,
      },
      statusCode,
    );
  }
}
