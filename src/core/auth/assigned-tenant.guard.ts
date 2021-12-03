import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AssignedTenant implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const params = request.params;

    if (process.env.ENABLE_AUTH === 'false') {
      return true;
    }

    if (!user)
      throw new HttpException('There is no user', HttpStatus.UNAUTHORIZED);

    if (params.id != user.tenant.id) throw new UnauthorizedException();

    return true;
  }
}
