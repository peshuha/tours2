import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../../module/user/user.service';
import { UserDto } from '@tour/lib-dto-js';
import { Public } from '../auth/auth.public';

@Controller('user')
export class UserController {
  constructor(private user: UserService) {}

  @Get('id/:id')
  async getById(@Param('id') id: string) {
    return this.user.getById(id);
  }

  @Public()
  @Post()
  async create(@Body() user: UserDto) {
    return this.user.create(user);
  }

  @Post('changepassword')
  async changePassword(
    @Body('id') id: string,
    @Body('password') password: string
  ) {
    console.log('UserController::changePassword', id, password);
    return this.user.changePassword(id, password);
  }
}
