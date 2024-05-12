import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private user: UserService
    ){}

    async signIn(login: string, psw: string): Promise<any> {
        const usr = await this.user.check(login, psw)
        if (!usr) {
          throw new UnauthorizedException();
        }
        return usr;
    }
}
