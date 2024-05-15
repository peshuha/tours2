import {IUser as IUserBase} from "@tour/lib-dto-js";
import {IPerson} from "./iperson";

export interface IUser extends IUserBase {
  person?: IPerson
}
