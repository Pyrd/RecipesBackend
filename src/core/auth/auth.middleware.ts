import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { User } from '~/api/auth/user/entities/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  fetchUserDataFromFirebase(firebaseUser) {
    const nUser = new User();

    nUser.email = firebaseUser.email;
    nUser.firebaseUid = firebaseUser.uid;

    return this.authService.createUserFromFirebase(nUser);
  }

  use(req: Request, res: any, next: () => void) {
    // console.log("Hello From Auth Middleware")
    const headers = req.headers;

    let jwt: string = headers['authorization'];

    if (!jwt) next();
    else {
      const splited = jwt.split(' ');

      if (splited.length != 2) {
        next();
      } else {
        jwt = splited[1];
        console.log('JWT', jwt);
        this.authService
          .verifyJwt(jwt)
          .then(async (r) => {
            console.log(r.uid);
            let storedUser = await this.authService.getUserFromJwt(r.uid);

            if (!storedUser)
              storedUser = await this.fetchUserDataFromFirebase(r);

            const user = {
              authProvider: {
                uid: r.uid,
                email: r.email,
              },
              storedUser: storedUser,
            };

            req['user'] = user;

            next();
          })
          .catch(() => {
            // req.headers.user = null
            // console.log('ERROR');
            // console.log("This is probably a wrong jwt")
            next();
          });
      }
    }
  }
}
