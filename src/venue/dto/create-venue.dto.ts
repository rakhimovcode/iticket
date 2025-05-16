import { Types } from "mongoose";

export class CreateVenueDto {
  name: string;

  address: string;

  location: string;

  site: string;

  phone_number: string;

  venueSchema: string;

  regionId: Types.ObjectId;

  districtId: Types.ObjectId;
}
