import { Injectable } from '@nestjs/common';
import { CreateCustomerCardDto } from './dto/create-customer-card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerCard } from './schemas/customer-card.schema';
import { Model } from 'mongoose';

@Injectable()
export class CustomerCardService {
  constructor(@InjectModel(CustomerCard.name) private readonly customerCardModel: Model<CustomerCard>){}
  create(createCustomerCardDto: CreateCustomerCardDto) {
    return this.customerCardModel.create(createCustomerCardDto)
  }

  findAll() {
    return this.customerCardModel.find({}).populate("customerId")
  }

  findOne(id: string) {
    return this.customerCardModel.findOne({_id:id})
  }

  update(id: string, updateCustomerCardDto: UpdateCustomerCardDto) {
    return this.customerCardModel.findByIdAndUpdate(id,updateCustomerCardDto)
  }

  remove(id: string) {
    return this.customerCardModel.findByIdAndDelete(id)
  }
}
