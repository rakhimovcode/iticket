import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schemas/cart.schema';
import { Customer, CustomerSchema } from '../customers/schemas/customer.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Cart.name,schema:CartSchema},
    {name:Customer.name,schema:CustomerSchema}
  ])],
  controllers: [CartController],
  providers: [CartService],
  exports:[CartService]
})
export class CartModule {}
