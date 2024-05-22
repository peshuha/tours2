/*
    name: string = "";
    description: string = "";
    tourOperator: string = "";
    price: string = "";
    img?: string = "";
    id: string = "";
    type?: TourType = "all";
*/

import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { TourType } from '@tour/lib-dto-js';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Tour {

    @Prop()
    id?: string;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    tourOperator: string;

    @Prop()
    price: string;

    @Prop()
    img?: string;

    @Prop()
    type?: string = "all";

    @Prop()
    is_syntetic?: boolean
  }

export type TourDocument = HydratedDocument<Tour>;
export const TourSchema = SchemaFactory.createForClass(Tour);
