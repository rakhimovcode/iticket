import { Types } from "mongoose";

export class CreateEventDto {
  name: string;
  photo: string;
  start_date: Date;
  start_time: string;
  finish_date: Date;
  finish_time: string;
  info: string;
  eventTypeId: Types.ObjectId;
  humanCategoryId: Types.ObjectId;
  venueId: Types.ObjectId;
  langId: Types.ObjectId;
  release_date: Date;
}
