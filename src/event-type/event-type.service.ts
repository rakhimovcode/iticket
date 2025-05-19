import { Injectable } from '@nestjs/common';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EventType } from './schemas/event-type.schema';
import { Model } from 'mongoose';

@Injectable()
export class EventTypeService {
  constructor(@InjectModel(EventType.name) private readonly eventTypeSchema: Model<EventType>){}
  create(createEventTypeDto: CreateEventTypeDto) {
    return this.eventTypeSchema.create(createEventTypeDto)
  }

  findAll() {
    return this.eventTypeSchema.find({})
  }

  findOne(id: string) {
    return this.eventTypeSchema.findById(id)
  }

  update(id: string, updateEventTypeDto: UpdateEventTypeDto) {
    return this.eventTypeSchema.findByIdAndUpdate(id,updateEventTypeDto)
  }

  remove(id: string) {
    return this.eventTypeSchema.findByIdAndDelete(id)
  }
}
