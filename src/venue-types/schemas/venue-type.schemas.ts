import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Venue } from "../../venue/schemas/venue.schema";
import { Type } from "../../types/schemas/type.schemas";

export type VenueTypesDocument = HydratedDocument<VenueType> ;
@Schema()
export class VenueType {
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:Venue.name})
    venueId: Types.ObjectId

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:Type.name})
    typeId:Types.ObjectId

}


export const VenueTypesSchema = SchemaFactory.createForClass(VenueType)
