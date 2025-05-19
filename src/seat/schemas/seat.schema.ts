import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Venue } from "../../venue/schemas/venue.schema";
import { SeatType } from "../../seat-type/schemas/seat-type.schema";

export type SeatDocument = HydratedDocument<Seat>
@Schema()
export class Seat {
  @Prop()
  sector: number;

  @Prop()
  row_number: number;

  @Prop()
  number: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Venue.name })
  venueId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: SeatType.name })
  seatTypeId: Types.ObjectId; 

  @Prop()
  location_in_schema:string
  
}
export const SeatSchema = SchemaFactory.createForClass(Seat)