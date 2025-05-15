import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Region } from "../../region/schemas/region.schema";

export type DistrictDocument = HydratedDocument<District>
@Schema()
export class District {

@Prop()
name:string

@Prop({type:Types.ObjectId, ref:Region.name})
regionId:Types.ObjectId

}

export const DistrictSchema = SchemaFactory.createForClass(District)