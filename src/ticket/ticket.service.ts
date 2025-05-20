import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket } from './schemas/ticket.schema';
import { isValidObjectId, Model } from 'mongoose';
import { Event } from '../event/schemas/event.schema';
import { Seat } from '../seat/schemas/seat.schema';
import { TicketStatus } from '../ticket-status/schemas/ticket-status.schema';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketSchema: Model<Ticket>,
    @InjectModel(Event.name) private readonly eventSchema: Model<Event>,
    @InjectModel(Seat.name) private readonly seatSchema: Model<Seat>,
    @InjectModel(TicketStatus.name)
    private readonly ticketStatusSchema: Model<TicketStatus>
  ) {}
  async create(createTicketDto: CreateTicketDto) {
    const { eventId, seatId, ticketStatusId } = createTicketDto;
    if (
      !isValidObjectId(eventId) ||
      !isValidObjectId(seatId) ||
      !isValidObjectId(ticketStatusId)
    ) {
      throw new BadRequestException("One of given ID is invalid!");
    }
    const event = await this.eventSchema.findById(eventId);
    if (!event) {
      throw new BadRequestException("Event  ID is invalid!");
    }
    const seat = await this.seatSchema.findById(seatId);
    if (!seat) {
      throw new BadRequestException("Seat  ID is invalid!");
    }
    const ticketStatus = await this.ticketStatusSchema.findById(ticketStatusId);
    if (!ticketStatus) {
      throw new BadRequestException("Ticket Status ID is invalid!");
    }
    const ticket = await this.ticketSchema.create(createTicketDto);
    return ticket;
  }

  findAll() {
    return this.ticketSchema
      .find({})
      .populate("eventId")
      .populate("ticketStatusId")
      .populate({
        path: "seatId",
        populate: {
          path: "seatTypeId",
        },
      });
  }

  findOne(id: string) {
    return this.ticketSchema
      .findById(id)
      .populate("eventId")
      .populate("seatId")
      .populate("ticketStatusId");
  }

  update(id: string, updateTicketDto: UpdateTicketDto) {
    return this.ticketSchema.findByIdAndUpdate(id, updateTicketDto);
  }

  remove(id: string) {
    return this.ticketSchema.findByIdAndDelete(id);
  }
}
