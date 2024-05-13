import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constant';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '2hour',
      },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/tour', {
      connectionName: 'tour',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/user', {
      connectionName: 'user',
    }),
    UserModule,
    // AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
