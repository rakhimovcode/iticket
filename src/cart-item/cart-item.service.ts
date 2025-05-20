import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CartItem } from './schemas/cart-item.schema';
import { isValidObjectId, Model } from 'mongoose';
import { Ticket } from '../ticket/schemas/ticket.schema';
import { Cart } from '../cart/schemas/cart.schema';

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(CartItem.name)
    private readonly cartItemSchema: Model<CartItem>,
    @InjectModel(Ticket.name) private readonly ticketSchema: Model<Ticket>,
    @InjectModel(Cart.name) private readonly  cartSchema: Model<Cart>
  ) {}
  async create(createCartItemDto: CreateCartItemDto) {
   const {ticketId,cartId} = createCartItemDto
   if(!isValidObjectId(ticketId)|| !isValidObjectId(cartId)){
    throw new BadRequestException("ID is invalid!")
   }
  const cart = await this.cartSchema.findById(cartId)
  if(!cart){
    throw new BadRequestException("Cart ID is invalid!")
  }
   const ticket = await this.ticketSchema.findById(ticketId);
   if (!ticket) {
     throw new BadRequestException("Ticket ID is invalid!");
   }
   const cartItem = await this.cartItemSchema.create(createCartItemDto)
   return cartItem
  }

  findAll() {
    return this.cartItemSchema.find({}).populate("cartId").populate("ticketId")
  }

  findOne(id: string) {
 return this.cartItemSchema.findById(id).populate("cartId").populate("ticketId")
  }

  update(id: string, updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemSchema.findByIdAndUpdate(id,updateCartItemDto)
  }

  remove(id: string) {
    return this.cartItemSchema.findByIdAndDelete(id)
  }
}
