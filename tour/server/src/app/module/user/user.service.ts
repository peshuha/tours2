import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../mongo/user';
import { Model } from 'mongoose';
import { UserDto } from '@lib-dto-js';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name, 'user') private md: Model<User>) {}

  async check(login: string, password: string) {
    return this.md.findOne({ login, password });
  }

  async getAll() {
    return this.md.find().exec();
  }

  async getById(id: string) {
    return this.md.findById(id);
  }

  async create(user: UserDto): Promise<User> {
    console.log('UserService::create', user);

    // Есть ли такой уже
    const usr = await this.md.findOne({ login: user.login }).exec();
    if (usr) {
      throw new Error('User exists');
    }

    // Проверяем пароль
    if (!user.password || user.password?.length < 3) {
      throw new Error('Password is too little');
    }

    const usr2 = new this.md(user);
    console.log('UserService::create.user', usr2);
    return usr2.save();
  }
}
