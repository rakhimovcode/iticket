import { Module } from '@nestjs/common';
import { SeatTypeService } from './seat-type.service';
import { SeatTypeController } from './seat-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SeatType, SeatTypeSchema } from './schemas/seat-type.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:SeatType.name,schema:SeatTypeSchema}
  ])],
  controllers: [SeatTypeController],
  providers: [SeatTypeService],
})
export class SeatTypeModule {}
