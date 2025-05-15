import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RegionDocument =  HydratedDocument<Region>

@Schema()
export class Region {
   @Prop()
   name:string
}
export const RegionSchema  = SchemaFactory.createForClass(Region)
