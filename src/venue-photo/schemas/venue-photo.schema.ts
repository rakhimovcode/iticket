import { Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, mongo, Types } from "mongoose";

export type VenuePhotoDocument = HydratedDocument<VenuePhoto>
export class VenuePhoto {
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:VenuePhoto.name})
    venueId:Types.ObjectId

    @Prop()
    url:string
        

}
export const VenuePhotoSchema = SchemaFactory.createForClass(VenuePhoto)
