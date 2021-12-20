import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtAuthenticationGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (process.env.ENABLE_AUTH === 'false') {
      return (
        user || {
          firstname: 'Michael',
          lastname: 'Test',
          email: 'dev@dev.com',
          phone: '0101010101',
          tenantId: 1,
          tenant: 'MYTENANT',
          role: 'ADMIN',
        }
      );
    }
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException('User not found');
    }
    return user;
  }
}
