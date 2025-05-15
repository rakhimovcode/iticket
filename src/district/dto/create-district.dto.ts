import { Types } from "mongoose";

export class CreateDistrictDto {
  name: string;
  regionId: Types.ObjectId;
}
