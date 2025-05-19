import { Module } from '@nestjs/common';
import { EventTypeService } from './event-type.service';
import { EventTypeController } from './event-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventType, EventTypeSchema } from './schemas/event-type.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:EventType.name,schema: EventTypeSchema}
  ])],
  controllers: [EventTypeController],
  providers: [EventTypeService],
})
export class EventTypeModule {}
