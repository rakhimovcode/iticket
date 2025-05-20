import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from '../cart/schemas/cart.schema';
import { Ticket, TicketSchema } from '../ticket/schemas/ticket.schema';
import { CartItem, CartItemSchema } from './schemas/cart-item.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Cart.name,schema:CartSchema},
    {name:Ticket.name, schema:TicketSchema},
    {name:CartItem.name,schema:CartItemSchema}
  ])],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
