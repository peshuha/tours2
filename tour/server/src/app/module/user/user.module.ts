import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from '../../mongo/user';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
<<<<<<< HEAD:tour/server/tour/src/app/module/user/user.module.ts
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], "user")
    ],
    controllers: [
    ],
    providers: [
        UserService
    ],
    exports: [
        UserService
    ]
=======
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'user'
    ),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
>>>>>>> a7cdc1d4547d926c2daac733fba0b1a8db41d291:tour/server/src/app/module/user/user.module.ts
})
export class UserModule {}
