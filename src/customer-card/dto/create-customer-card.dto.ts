import { Types } from "mongoose";

export class CreateCustomerCardDto {
  
  customerId: Types.ObjectId;
  name: string;
  phone_number: string;
  year: string;
  month: string;
  is_active: boolean;
  is_main: boolean;
}
