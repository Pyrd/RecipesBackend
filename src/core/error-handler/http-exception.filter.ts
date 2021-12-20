import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common';

@Catch()
/**
 * AllExceptionsFilter
 *
 * Was named HttpExceptionsFilter, but it catches not only http errors
 */
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    Logger.error(
      `${new Date().toISOString()} - [URL: ${
        request.url
      }][${status}] ${exception}`,
    );

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'INTERNAL_SERVER_ERROR';

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
