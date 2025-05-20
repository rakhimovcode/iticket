import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Customer } from "../../customers/schemas/customer.schema";

export type CartDocument = HydratedDocument<Cart>
@Schema()
export class Cart {
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:Customer.name})
    customerId:number

    @Prop()
    created_at:string


    @Prop()
    finished_at:string


    @Prop({enum:['active','expired']})
    status:string

}
export const CartSchema = SchemaFactory.createForClass(Cart)
