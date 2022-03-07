import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '~/api/auth/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendUserConfirmation(user: User, isANewUser = true) {
    const confirm = isANewUser ? 'confirm' : 'confirm-email';
    const url = `${this.configService.get(
      'link.webapp',
    )}/auth/${confirm}?token=${user.confirmationToken}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Recepies ! Confirm your Email',
      template: 'user-confirm',
      context: {
        name: user.displayname,
        url,
      },
    });
  }

  async sendResetPasswordMail(user: User) {
    try {
      const url = `${this.configService.get(
        'link.webapp',
      )}/auth/reset-password?token=${user.confirmationToken}`;

      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Recepies - Reset your password',
        template: 'user-reset-password',
        context: {
          name: user.displayname,
          url,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
