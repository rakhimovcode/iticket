import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import { Event, EventSchema } from '../event/schemas/event.schema';
import { Seat, SeatSchema } from '../seat/schemas/seat.schema';
import { TicketStatus, TicketStatusSchema } from '../ticket-status/schemas/ticket-status.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Ticket.name,schema:TicketSchema},
    {name:Event.name,schema:EventSchema},
    {name:Seat.name,schema:SeatSchema},
    {name:TicketStatus.name,schema:TicketStatusSchema}
  ])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
