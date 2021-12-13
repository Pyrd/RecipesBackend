import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './core/auth/auth.service';

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor() {}

  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // login(@Request() req) {
  //   return this.authService.login(req.user);
  // }
}
