import { Types } from "mongoose";

export class CreateSeatDto {
  sector: number;

  row_number: number;

  number: number;

  venueId: Types.ObjectId;

  seatTypeId: Types.ObjectId;

  location_in_schema: string;
}
