import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Customer } from "../../customers/schemas/customer.schema";

export type CustomerCardDocument = HydratedDocument<CustomerCard>
@Schema()
export class CustomerCard {
    @Prop({type:Types.ObjectId,ref:Customer.name})
    customerId:Types.ObjectId


    @Prop()
    name:string

    @Prop()
    phone_number:string

    @Prop()
    year:string

    @Prop()
    month:string

    @Prop({default:false})
    is_active:boolean

    @Prop({default:false})
    is_main:boolean

}
export const CustomerCardSchema = SchemaFactory.createForClass(CustomerCard)

