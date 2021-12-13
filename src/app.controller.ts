import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
