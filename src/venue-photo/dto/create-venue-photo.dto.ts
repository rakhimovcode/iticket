import { Types } from "mongoose";

export class CreateVenuePhotoDto {
  venueId: Types.ObjectId;
  url: string;
}

