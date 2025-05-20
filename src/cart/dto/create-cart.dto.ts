import { Types } from "mongoose";

export class CreateCartDto {
  customerId:number
  created_at: string;
  finished_at: string;
  status: string;
}
