import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schemas/cart.schema';
import { isValidObjectId, Model } from 'mongoose';
import { Customer } from '../customers/schemas/customer.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private readonly cartSchema:Model<Cart>,
@InjectModel(Customer.name) private readonly customerSchema: Model<Customer>){}
  async create(createCartDto: CreateCartDto) {
    const {customerId} = createCartDto
    if(!isValidObjectId(customerId)){
      throw new BadRequestException("ID is invalid")
    }
    const customer = await this.customerSchema.findById(customerId)
    if(!customer){
      throw new BadRequestException("There is no customer with the given ID")
    }
     const cart = await this.cartSchema.create(createCartDto)
  }

  findAll() {
    return this.cartSchema.find({}).populate("customerId")
  }

  findOne(id: string) {
    return this.cartSchema.findById(id).populate("customerId")
  }

  update(id: string, updateCartDto: UpdateCartDto) {
    return this.cartSchema.findByIdAndUpdate(id,updateCartDto)
  }

  remove(id: string) {
    return this.cartSchema.findByIdAndDelete(id)

  }
}
