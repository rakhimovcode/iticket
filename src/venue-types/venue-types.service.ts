import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVenueTypeDto } from './dto/create-venue-type.dto';
import { UpdateVenueTypeDto } from './dto/update-venue-type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { VenueType } from './schemas/venue-type.schemas';
import { isValidObjectId, Model } from 'mongoose';
import { Type } from '../types/schemas/type.schemas';
import { Venue } from '../venue/schemas/venue.schema';

@Injectable()
export class VenueTypesService {
  constructor(@InjectModel(VenueType.name) private readonly venueTypeSchema: Model<VenueType>,
  @InjectModel(Type.name) private readonly typeSchema: Model<Type>,
  @InjectModel(Venue.name) private readonly venueSchema: Model<Venue>
){}
  async create(createVenueTypeDto: CreateVenueTypeDto) {
   const {venueId,typeId} = createVenueTypeDto
   if(!isValidObjectId(venueId) || !isValidObjectId(typeId)){
    throw new BadRequestException("One of given ID is not valid!")
   }
   const venue = await this.venueSchema.findById(venueId)
   if(!venue){
    throw new BadRequestException("Venue ID is invalid")
   } 
   const type = await this.typeSchema.findById(typeId)
   if(!type){
    throw new BadRequestException("Types ID is invalid")
   }
   const venuetype = await this.venueTypeSchema.create(createVenueTypeDto)
   return venuetype
  }

  findAll() {
    return this.venueTypeSchema.find({}).populate("venueId").populate("typeId")
  }

  findOne(id: string) {
    return this.venueTypeSchema.find({}).populate("venueId").populate("typeId");
  }

  update(id:string, updateVenueTypeDto: UpdateVenueTypeDto) {
    return this.venueTypeSchema.findByIdAndUpdate(id,updateVenueTypeDto)
  }

  remove(id: string) {
    return this.venueTypeSchema.findByIdAndDelete(id)
  }
}
