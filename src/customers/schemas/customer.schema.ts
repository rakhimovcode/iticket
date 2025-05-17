import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CustomerDocument = HydratedDocument<Customer>
@Schema()
export class Customer {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  phone_number: string;

  @Prop()
  hashed_password: string;

  @Prop()
  email: string;

  @Prop()
  birth_date: Date;

  @Prop()
  gender: string;

  @Prop({default:false})
  is_active:boolean

  @Prop({ default: "" })
  hashed_refresh_token: string;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);
