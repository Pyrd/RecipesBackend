import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private configService: ConfigService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!this.configService.get("enableAuth"))
            return true;

        if (!roles)
            return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.storedUser || !user.storedUser.role)
            return false;

        if (roles.includes(user.storedUser.role.name)) return true;

        return false
    }
}
