import { Injectable } from '@nestjs/common';
import { CreateDeliveryMethodDto } from './dto/create-delivery-method.dto';
import { UpdateDeliveryMethodDto } from './dto/update-delivery-method.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DeliveryMethod } from './schemas/delivery-method.schema';
import { Model } from 'mongoose';

@Injectable()
export class DeliveryMethodService {
  constructor(@InjectModel(DeliveryMethod.name) private readonly deliveryMethodSchema: Model<DeliveryMethod> ){}
  create(createDeliveryMethodDto: CreateDeliveryMethodDto) {
    return this.deliveryMethodSchema.create(createDeliveryMethodDto)
  }

  findAll() {
    return this.deliveryMethodSchema.find({})
  }

  findOne(id: string) {
    return this.deliveryMethodSchema.findById(id)
  }

  update(id: string, updateDeliveryMethodDto: UpdateDeliveryMethodDto) {
    return this.deliveryMethodSchema.findById(id,updateDeliveryMethodDto)
  }

  remove(id: string) {
    return this.deliveryMethodSchema.findByIdAndDelete(id)
  }
}
