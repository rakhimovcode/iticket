import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/mongoose';
import { District } from './schemas/district.schema';
import { Model } from 'mongoose';
import { Region } from '../region/schemas/region.schema';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District.name) private readonly districtModel: Model<District>,
@InjectModel(Region.name) private readonly regionSchema: Model<Region>){}
  async create(createDistrictDto: CreateDistrictDto) {
    const {regionId} = createDistrictDto
   const region = await this.regionSchema.findById(regionId)
   if(!region){
    throw new BadRequestException("Bunday Region Yo'q")
   }
   const district = await this.districtModel.create(createDistrictDto)
   region.district.push(district)
   await region.save()
   return district
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
