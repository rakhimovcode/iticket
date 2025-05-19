import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { EventType } from "../../event-type/schemas/event-type.schema";
import { HumanCategory } from "../../human-category/schemas/human-category.schema";
import { Venue } from "../../venue/schemas/venue.schema";
import { Lang } from "../../lang/schemas/lang.schema";

export type EventDocument = HydratedDocument<Event>
@Schema()
export class Event {
  @Prop()
  name: string;

  @Prop()
  photo: string;

  @Prop()
  start_date: Date;

  @Prop()
  start_time: string;

  @Prop()
  finish_date: Date;

  @Prop()
  finish_time: string;

  @Prop()
  info: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: EventType.name })
  eventTypeId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: HumanCategory.name })
  humanCategoryId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Venue.name })
  venueId: Types.ObjectId;
s
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Lang.name })
  langId: Types.ObjectId;


  @Prop()
  release_date:Date
}

export const EventSchema = SchemaFactory.createForClass(Event)
