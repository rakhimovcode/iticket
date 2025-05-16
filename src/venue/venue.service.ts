import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Venue } from './schemas/venue.schema';
import { isValidObjectId, Model } from 'mongoose';
import { Region } from '../region/schemas/region.schema';
import { District } from '../district/schemas/district.schema';

@Injectable()
export class VenueService {
  constructor(@InjectModel(Venue.name)private readonly venueSchema: Model<Venue>,
  @InjectModel(Region.name) private readonly regionSchema: Model<Region>,
  @InjectModel(District.name)private readonly districtSchema: Model<District>
  ){}
  async create(createVenueDto: CreateVenueDto) {
    const {regionId,districtId} = createVenueDto
    if(!isValidObjectId(regionId) ||!isValidObjectId(districtId) ){
      throw new BadRequestException("ID is Invalid!")
    }
    const region = await this.regionSchema.findById(regionId)
    if(!region){
      throw new BadRequestException("Region ID Xato Berilgan")
    }
    const district = await this.districtSchema.findById(districtId)
    if(!district){
      throw new BadRequestException("District ID Xato Berilgan");
    }
    const venue  = await this.venueSchema.create(createVenueDto)
    return venue
  }

  findAll() {
    return this.venueSchema.find({}).populate("regionId").populate("districtId")
  }

  findOne(id: string) {
    return this.venueSchema.findById(id)
  }

  update(id: string, updateVenueDto: UpdateVenueDto) {
    return this.districtSchema.findByIdAndUpdate(id,updateVenueDto)
  }

  remove(id: string) {
    return this.districtSchema.findByIdAndDelete(id)
  }
}
