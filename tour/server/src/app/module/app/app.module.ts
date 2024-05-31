import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
<<<<<<< HEAD:tour/server/tour/src/app/module/app/app.module.ts
import { jwtConstants } from '../auth/jwt.constant';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { ProfileModule } from '../profile/profile.module';
import { TourModule } from '../tour/tour.module';
import { ImageModule } from '../image/image.module';
=======
import { jwtConstants } from '../auth/constant';
>>>>>>> a7cdc1d4547d926c2daac733fba0b1a8db41d291:tour/server/src/app/module/app/app.module.ts

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
<<<<<<< HEAD:tour/server/tour/src/app/module/app/app.module.ts
        expiresIn: '2h',
=======
        expiresIn: '2hour',
>>>>>>> a7cdc1d4547d926c2daac733fba0b1a8db41d291:tour/server/src/app/module/app/app.module.ts
      },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/tour', {
      connectionName: 'tour',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/user', {
      connectionName: 'user',
    }),
    UserModule,
    AuthModule,
    ProfileModule,
    TourModule,
    ImageModule, 
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
