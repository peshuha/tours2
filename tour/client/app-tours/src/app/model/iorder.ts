import {ITour} from "@tour/lib-dto-js";

export  type  IOrder = ITour | {
  date?: string,
  createdAt?: string,
  avatar?: string,
  firstName?: string,
  lastName?: string,
  cardNumber?: string,
  birthDate?: string | null,
  age?: number | null,
  citizenship?: string | null
  userid?: number
}

export type IOrderKey = keyof IOrder
