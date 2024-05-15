import { IUser } from './iuser';

export class UserDto implements IUser {
  id?: string = '';
  login: string = '';
  password?: string;
  email?: string;
}
