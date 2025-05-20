import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Ticket } from "../../ticket/schemas/ticket.schema";
import { Cart } from "../../cart/schemas/cart.schema";

export type CartItemDocument = HydratedDocument<CartItem>
@Schema()
export class CartItem {
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:Ticket.name})
    ticketId: number


    @Prop({type:mongoose.Schema.Types.ObjectId, ref:Cart.name})
    cartId: number
    
}
export const CartItemSchema = SchemaFactory.createForClass(CartItem)
