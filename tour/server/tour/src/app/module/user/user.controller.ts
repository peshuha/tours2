import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UserService } from '../../module/user/user.service';
import { User } from '../../mongo/user';

@Controller('user')
export class UserController {
    constructor(
        private user: UserService
    ) {

    }

    @Get()
    async getAll() {
        return this.user.getAll()
    }

    @Post()
    async create(@Body("login") login) {
        return this.user.create(login)
    }
}
