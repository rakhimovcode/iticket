import { Module } from '@nestjs/common';
import { CustomerCardService } from './customer-card.service';
import { CustomerCardController } from './customer-card.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerCard, CustomerCardSchema } from './schemas/customer-card.schema';
import { Customer, CustomerSchema } from '../customers/schemas/customer.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:CustomerCard.name,schema:CustomerCardSchema},
    {name:Customer.name,schema:CustomerSchema}
  ])],
  controllers: [CustomerCardController],
  providers: [CustomerCardService],
})
export class CustomerCardModule {}
