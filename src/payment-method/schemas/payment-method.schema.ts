import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PaymentMethodDocument  = HydratedDocument<PaymentMethod>
@Schema()
export class PaymentMethod {
    @Prop()
    name:string
}
export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod)

