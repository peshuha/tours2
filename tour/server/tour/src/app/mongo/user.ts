import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

@Schema()
export class User {

    @Prop()
    login: string
    
    @Prop()
    email?: string    

    // Пока просто не возвращаем клиенту (см UserSevice)
    @Prop()
    password: string
}

// export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);