import {
  Body,
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '@tour/lib-dto-js';
import { AuthGuard } from './auth.guard';
import { Public } from './auth.public';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() dt: AuthDto) {
    console.log('AuthController::login', dt);
    return this.auth.signIn(dt.login, dt.password);
  }

  // @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req['__user'];
  }
}
