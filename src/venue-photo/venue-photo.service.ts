import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVenuePhotoDto } from './dto/create-venue-photo.dto';
import { UpdateVenuePhotoDto } from './dto/update-venue-photo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { VenuePhoto } from './schemas/venue-photo.schema';
import { isValidObjectId, Model } from 'mongoose';
import { Venue } from '../venue/schemas/venue.schema';

@Injectable()
export class VenuePhotoService {
  constructor(@InjectModel(VenuePhoto.name) private readonly venuePhotoSchema: Model<VenuePhoto>,
  @InjectModel(Venue.name) private readonly venueSchema: Model<Venue>
  ){}
  async create(createVenuePhotoDto: CreateVenuePhotoDto) {
    const {venueId} = createVenuePhotoDto
    if(!isValidObjectId(venueId)){
      throw new BadRequestException("ID is invalid")
    }
    const venue = await this.venuePhotoSchema.create(createVenuePhotoDto)
    return venue
  }

  findAll() {
    return this.venuePhotoSchema.find({}).populate("venueId")
  }

  findOne(id: string) {
    return this.venuePhotoSchema.findById(id).populate("venuId")
  }

  update(id: string, updateVenuePhotoDto: UpdateVenuePhotoDto) {
    return this.venuePhotoSchema.findByIdAndUpdate(id,updateVenuePhotoDto)
  }

  remove(id: string) {
    return this.venuePhotoSchema.findByIdAndDelete(id)
  }
}
