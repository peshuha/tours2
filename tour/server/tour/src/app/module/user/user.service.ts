import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../mongo/user';
import { Model} from "mongoose"

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name, "user") private md: Model<User>
    ) {

    }

    async getAll() {
        return this.md.find().exec()
    }

    async getById(id: string) {
        return this.md.findById(id).exec()
    } 

    async create(login: string): Promise<User> {
        console.log("UserService::create", login)
        const user = new this.md({
            login: login,
            password: "hello"
        })
        user.login = login
        user.password = "hello"

        console.log("UserService::create.user", user)
        return user.save()
    }
}
