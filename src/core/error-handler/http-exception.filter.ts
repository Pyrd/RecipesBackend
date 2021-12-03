import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const st =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const { err }: any = exception;
    Logger.error(err);
    console.error(err);

    response.status(st).json({
      statusCode: st,
      timestamp: new Date().toISOString(),
      path: request.url,
      info: err.errorInfo
        ? err.errorInfo
        : {
            message: err.message,
          },
    });
  }
}
