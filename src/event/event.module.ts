import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schemas/event.schema';
import { HumanCategory, HumanCategorySchema } from '../human-category/schemas/human-category.schema';
import { Venue, VenueSchema } from '../venue/schemas/venue.schema';
import { Lang, LangSchema } from '../lang/schemas/lang.schema';
import { EventType, EventTypeSchema } from '../event-type/schemas/event-type.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Event.name,schema:EventSchema},
    {name:HumanCategory.name,schema:HumanCategorySchema},
    {name:Venue.name,schema:VenueSchema},
    {name:Lang.name,schema:LangSchema},
    {name:EventType.name,schema:EventTypeSchema}
  ])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
