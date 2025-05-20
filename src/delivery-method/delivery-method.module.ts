import { Module } from '@nestjs/common';
import { DeliveryMethodService } from './delivery-method.service';
import { DeliveryMethodController } from './delivery-method.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryMethod, DeliveryMethodSchema } from './schemas/delivery-method.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:DeliveryMethod.name,schema:DeliveryMethodSchema}
  ])],
  controllers: [DeliveryMethodController],
  providers: [DeliveryMethodService],
exports:[DeliveryMethodService]
})
export class DeliveryMethodModule {}
