import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mailjet from 'node-mailjet';
import { User } from 'src/api/auth/user/entities/user.entity';

// const mailjet = require('node-mailjet');

@Injectable()
export class MailService {
  constructor(private configService: ConfigService) { }

  sendConfirmUser(user: User): Promise<any> {
    const mailjetConfig = this.configService.get('mailjet');
    const frontendUrl = this.configService.get('frontendUrl');

    if (!mailjetConfig || !frontendUrl) {
      return new Promise<any>((resolve, reject) => {
        resolve(user);
      });
    }
    const mailer = mailjet.connect(mailjetConfig.public, mailjetConfig.private);

    if (!mailer || !mailjet)
      throw new HttpException(
        'Cannot initialize mailjet',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const url = `${frontendUrl}/auth/confirm?token=${user.confirmationToken}`;

    return mailer.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'contact@contact.com',
            Name: 'Contact',
          },
          To: [
            {
              Email: user.email,
              Name: `${user.firstname} ${user.lastname}`,
            },
          ],
          Subject: 'Contact',
          TextPart: 'Confirm your account',
          HTMLPart: `Your account has just been created, please confirm it and create your password by going <a href="${url}">here</a`,
          CustomID: 'AppGettingStartedTest',
        },
      ],
    });
  }

  async sendResetPasswordMail(user: User) {
    // TODO [IMPLEMENT]
  }
}
