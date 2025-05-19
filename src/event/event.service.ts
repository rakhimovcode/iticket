import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Venue } from '../venue/schemas/venue.schema';
import { EventType } from '../event-type/schemas/event-type.schema';
import { Lang } from '../lang/schemas/lang.schema';
import { HumanCategory } from '../human-category/schemas/human-category.schema';
import { throws } from 'assert';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private readonly eventSchema: Model<Event>,
  @InjectModel(Venue.name) private readonly venueSchema: Model<Venue>,
  @InjectModel(EventType.name) private readonly eventTypeSchema: Model<EventType>,
  @InjectModel(Lang.name) private readonly langSchema: Model<Lang>,
  @InjectModel(HumanCategory.name) private readonly humanCategorySchema: Model<HumanCategory>
  ){}
  async create(createEventDto: CreateEventDto) {
    const {eventTypeId,venueId,humanCategoryId,langId} = createEventDto
    if(!isValidObjectId(eventTypeId) || !isValidObjectId(venueId) || !isValidObjectId(humanCategoryId) || !isValidObjectId(langId)){
      throw new BadRequestException("Some of given ID invalid!")
    }
    const venue = await this.venueSchema.findById(venueId)
    if(!venue){
      throw new BadRequestException("Venue ID invalid!");
    }
    const humanCategory = await this.humanCategorySchema.findById(humanCategoryId)
    if(!humanCategory){
       throw new BadRequestException("Human-Category ID invalid!");
    }
    const lang = await this.langSchema.findById(langId)
    if(!lang){
       throw new BadRequestException("Lang ID invalid!");
    }
    const eventType = await this.eventTypeSchema.findById(eventTypeId)
    if(!eventType){
       throw new BadRequestException("Event-Type ID invalid!");
    }
    const event = await this.eventSchema.create(createEventDto)
    return event
  }

  findAll() {
    return this.eventSchema.find({}).populate("venueId").populate("langId").populate("eventTypeId").populate("humanCategoryId")
  }

  findOne(id: string) {
    return this.eventSchema
      .findById(id)
      .populate("venueId")
      .populate("langId")
      .populate("eventTypeId")
      .populate("humanCategoryId");
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.eventSchema.findByIdAndUpdate(id)
  }

  remove(id: string) {
    return this.eventSchema.findByIdAndDelete(id)
  }
}
