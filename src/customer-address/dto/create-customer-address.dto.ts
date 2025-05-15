import { Types } from "mongoose";

export class CreateCustomerAddressDto {
  customerId: Types.ObjectId;
  name: string;
  country: string;
  regionId: Types.ObjectId;
  districtId: Types.ObjectId;
  street: string;
  house: string;
  flat: string;
  info: string;
}
