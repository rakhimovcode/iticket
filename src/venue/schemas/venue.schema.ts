import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Region } from "../../region/schemas/region.schema";
import { District } from "../../district/schemas/district.schema";

export type VenueDocument = HydratedDocument<Venue>
@Schema()
export class Venue {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  location: string;

  @Prop()
  site: string;

  @Prop()
  phone_number: string;

  @Prop()
  venueSchema: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Region.name })
  regionId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: District.name })
  districtId: Types.ObjectId;
}
export const VenueSchema = SchemaFactory.createForClass(Venue)
