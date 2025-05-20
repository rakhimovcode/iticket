import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodController } from './payment-method.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentMethod, PaymentMethodSchema } from './schemas/payment-method.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:PaymentMethod.name,schema:PaymentMethodSchema}
  ])],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
  exports:[PaymentMethodService]
})
export class PaymentMethodModule {}
