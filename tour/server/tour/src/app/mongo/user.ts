import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

//
import {IUser} from "@tour/lib-dto"
import { isNumberObject } from 'util/types';

@Schema()
export class User {

    @Prop()
    login: string
    
    @Prop()
    email?: string    

    
    @Prop({
        set: function(v: string) {
            console.log("User: @Prop() password", this.password)
            return v.toUpperCase()
        }
    })
    password: string
}

// export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

export class UserDto implements IUser {
    login: string
    password?: string
    email?: string    
}
