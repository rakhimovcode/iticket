import { Types } from "mongoose";

export class CreateVenueTypeDto {
  venueId: Types.ObjectId;
  typeId: Types.ObjectId;
}
