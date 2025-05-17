import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TypesDocument = HydratedDocument<Type>
@Schema()
export class Type {
    @Prop()
    name:string
}

export const TypesSchema = SchemaFactory.createForClass(Type)