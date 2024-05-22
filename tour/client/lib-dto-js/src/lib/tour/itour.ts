import {TourType} from "./i-tour-filter";

export interface ITour {
  _id: string;
  name: string;
  description: string;
  tourOperator: string;
  price: string;
  img?: string;
  type?: TourType;
}
