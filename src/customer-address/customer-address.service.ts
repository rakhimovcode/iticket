import { Injectable } from '@nestjs/common';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerAddress } from './schemas/customer-address.schema';
import { Model } from 'mongoose';

@Injectable()
export class CustomerAddressService {
  constructor(@InjectModel(CustomerAddress.name) private readonly customerAdress: Model<CustomerAddress>){}
  create(createCustomerAddressDto: CreateCustomerAddressDto) {
    return this.customerAdress.create(createCustomerAddressDto)
  }

  findAll() {
    return this.customerAdress.find({}).populate("customerId").populate("regionId").populate("districtId")
  }

  findOne(id: string) {
    return this.customerAdress
      .findOne({ _id: id })
      .populate("customerId")
      .populate("regionId")
      .populate("districtId");
  }

  update(id: string, updateCustomerAddressDto: UpdateCustomerAddressDto) {
    return this.customerAdress.findByIdAndUpdate(id,updateCustomerAddressDto)
  }

  remove(id: string) {
    return this.customerAdress.findByIdAndDelete(id)
  }
}
