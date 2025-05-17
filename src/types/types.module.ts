import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Type, TypesSchema } from './schemas/type.schemas';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Type.name,schema:TypesSchema}
  ])],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypesModule {}
