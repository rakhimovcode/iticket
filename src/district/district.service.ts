import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/mongoose';
import { District } from './schemas/district.schema';
import { Model } from 'mongoose';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District.name) private readonly districtModel: Model<District> ){}
  create(createDistrictDto: CreateDistrictDto) {
   return this.districtModel.create(createDistrictDto)
  }

  findAll() {
    return this.districtModel.find({}).populate("regionId");
  }

  findOne(id: string) {
    return this.districtModel.findOne({_id:id}).populate("regionId")
  }

  update(id: string, updateDistrictDto: UpdateDistrictDto) {
    return this.districtModel.findByIdAndUpdate(id,updateDistrictDto)
  }

  remove(id: string) {
    return this.districtModel.findByIdAndDelete(id)

  }
}
