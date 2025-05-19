import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EventTypeDocument = HydratedDocument<EventType>
@Schema()
export class EventType {
    @Prop()
    name:string
}
export const EventTypeSchema = SchemaFactory.createForClass(EventType)


