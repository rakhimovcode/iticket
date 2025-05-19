import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type HumanCategoryDocument = HydratedDocument<HumanCategory>
@Schema()
export class HumanCategory {
    @Prop()
    name:string

    @Prop()
    start_age:number

    @Prop()
    finish_age:number

    @Prop({enum:['Male','Female','Everybody']})
    gender:string
}
export const HumanCategorySchema = SchemaFactory.createForClass(HumanCategory)
