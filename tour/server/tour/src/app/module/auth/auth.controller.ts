import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private auth: AuthService
    ){}

    @Get("login")
    login() {
        
    }

}
