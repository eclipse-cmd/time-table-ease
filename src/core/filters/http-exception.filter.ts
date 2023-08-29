import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ENV = this.configService.get<string>('ENV');

    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>(),
      status = exception.getStatus();

    //log error
    this.logger.error(`Exception: ${exception.message},\nStatus: ${status}`);

    const res = {
      timestamp: new Date().toISOString(),
      status,
      message: exception.message,
      stacktrace: ENV === 'dev' ? exception.stack : undefined,
    };

    response.status(status).json(res);
  }
}
