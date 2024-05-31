import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop()
  login: string;

  @Prop()
  email?: string;

<<<<<<< HEAD:tour/server/tour/src/app/mongo/user.ts
    // Пока просто не возвращаем клиенту (см UserSevice)
    @Prop()
    password: string
=======
  // Пока просто не возвращаем клиенту (см UserSevice)
  @Prop()
  password: string;
}
>>>>>>> a7cdc1d4547d926c2daac733fba0b1a8db41d291:tour/server/src/app/mongo/user.ts

    @Prop()
    name?: string
    
    @Prop()
    lastname?: string

    @Prop()
    cardNumber?: string

    @Prop()
    city?: string

    @Prop()
    age?: number
  }

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
