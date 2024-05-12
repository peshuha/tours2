import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../../module/user/user.service';
import { UserDto } from '@lib-dto-js';

@Controller('user')
export class UserController {
    constructor(
        private user: UserService
    ) {
    }

    @Get(":id")
    async getById(@Param("id") id: string) {
        return this.user.getById(id)
    }

    @Post()
    async create(@Body() user: UserDto) {
        return this.user.create(user)
    }
}
