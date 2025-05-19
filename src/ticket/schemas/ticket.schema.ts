import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Event } from "../../event/schemas/event.schema";
import { Seat } from "../../seat/schemas/seat.schema";

export type TicketDocument = HydratedDocument<Ticket>
@Schema()
export class Ticket {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Event.name })
  eventId: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Seat.name })
  seatId: number;

  @Prop()
  price: number;

  @Prop()
  service_fee: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Ticket.name })
  ticketStatusId: number;

  @Prop()
  ticket_type:string
}
export const TicketSchema = SchemaFactory.createForClass(Ticket)
