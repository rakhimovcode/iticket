import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Customer } from "../../customers/schemas/customer.schema";
import { Region } from "../../region/schemas/region.schema";
import { District } from "../../district/schemas/district.schema";

export type CustomerAddressDocument = HydratedDocument<CustomerAddress>
@Schema()
export class CustomerAddress {
  @Prop({ type: Types.ObjectId, ref: Customer.name })
  customerId: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  country: string;

  @Prop({ type: Types.ObjectId, ref: Region.name })
  regionId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: District.name })
  districtId: Types.ObjectId;

  @Prop()
  street:string

  @Prop()
  house:string

  @Prop()
  flat:string

  @Prop()
  location:string


  @Prop()
  post_index:string

  @Prop()
  info:string
}



export const CustomerAddressSchema = SchemaFactory.createForClass(CustomerAddress)
