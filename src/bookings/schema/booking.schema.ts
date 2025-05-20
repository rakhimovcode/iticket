import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Cart } from "../../cart/schemas/cart.schema";
import { PaymentMethod } from "../../payment-method/schemas/payment-method.schema";
import { DeliveryMethod } from "../../delivery-method/schemas/delivery-method.schema";

export type BookingDocument = HydratedDocument<Booking>
@Schema()
export class Booking {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Cart.name })
  cartId: number;

  @Prop()
  created_at: string;

  @Prop()
  finished_at: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: PaymentMethod.name })
  paymentMethodId: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: DeliveryMethod.name })
  deliveryMethodId: number;

  @Prop({ enum: ["booked", "expired", "rejected"] })
  status: string;
}
export const BookingSchema = SchemaFactory.createForClass(Booking)
