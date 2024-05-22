import { TourType } from "./i-tour-filter";
import { ITour } from "./itour";

export class TourDto implements  ITour {
    _id: string = "";
    name: string = "";
    description: string = "";
    tourOperator: string = "";
    price: string = "";
    img?: string = "";
    type?: TourType = "all";
  }