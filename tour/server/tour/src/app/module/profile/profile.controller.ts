import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('profile')
export class ProfileController {

    constructor(
        private user: UserService
    ) {
    }

    @Get()
    profile(@Request() req) {
        
    }

    @Post("changepassword")
    async changePassword(@Request() req, @Body("password") password: string) {
        console.log("UserController::changePassword", password)
        const id = req["__user"]?._id
        console.log("UserController::changePassword", id, password)
        return this.user.changePassword(id, password)
    }
}
