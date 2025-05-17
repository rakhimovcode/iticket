import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Seat } from './schemas/seat.schema';
import { isValidObjectId, Model } from 'mongoose';
import { Venue } from '../venue/schemas/venue.schema';
import { SeatType } from '../seat-type/schemas/seat-type.schema';

@Injectable()
export class SeatService {
  constructor(@InjectModel(Seat.name) private readonly seatSchema:Model<Seat>,
   @InjectModel(Venue.name) private readonly venueSchema: Model<Venue>,
   @InjectModel(SeatType.name) private readonly seatType: Model<SeatType>
  ){}
  async create(createSeatDto: CreateSeatDto) {
    const {venueId,seatTypeId} = createSeatDto
    if(!isValidObjectId(venueId)|| !isValidObjectId(seatTypeId)){
      throw new BadRequestException("ID is invalid!")
    }
    const venue = await this.venueSchema.findById(venueId)
    if(!venue){
      throw new BadRequestException("Venue ID is invalid!");
    }
    const seatType = await this.seatType.findById(seatTypeId)
    if (!seatType) {
      throw new BadRequestException("Seat Type ID is invalid!");
    }
    const seat = await this.seatSchema.create(createSeatDto
    )
    return seat
  }

  findAll() {
    return this.seatSchema.find({}).populate("seatTypeId").populate("venueId")
  }

  findOne(id: string) {
    return this.seatSchema
      .findById(id)
      .populate("seatTypeId")
      .populate("venueId");
  }

  update(id: string, updateSeatDto: UpdateSeatDto) {
    return this.seatSchema.findByIdAndUpdate(id,updateSeatDto)
  }

  remove(id: string) {
    return this.seatSchema.findByIdAndDelete(id)
  }
}
