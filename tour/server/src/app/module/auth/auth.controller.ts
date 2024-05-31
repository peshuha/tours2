import {
  Body,
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, UserDto } from '@tour/lib-dto-js';
import { AuthGuard } from './auth.guard';
import { Public } from './auth.public';
import { UserService } from '../user/user.service';

@Controller()
export class AuthController {
<<<<<<< HEAD:tour/server/tour/src/app/module/auth/auth.controller.ts
  constructor(
    private auth: AuthService,
    private usr: UserService
  ) {}

  @Public()
  @Post("login")
  async login(@Body() dt: AuthDto) {
    console.log('AuthController::login', dt);
    return this.auth.signIn(dt.login, dt.password);
  }

  @Public()
  @Post("register")
  register(@Body() user: UserDto) {
      return this.usr.create(user)
  }

=======
  constructor(private auth: AuthService) {}

  @Get('login')
  login() {}
>>>>>>> a7cdc1d4547d926c2daac733fba0b1a8db41d291:tour/server/src/app/module/auth/auth.controller.ts
}
