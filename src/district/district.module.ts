import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { District, DistrictSchema } from './schemas/district.schema';
import { Region, RegionSchema } from '../region/schemas/region.schema';
import { RegionModule } from '../region/region.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name: District.name,schema:DistrictSchema},
    {name: Region.name,schema:RegionSchema}
  ]),
  RegionModule
],
  controllers: [DistrictController],
  providers: [DistrictService],
  exports:[DistrictModule]
})
export class DistrictModule {}
