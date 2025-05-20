import { PartialType } from '@nestjs/swagger';
import { CreateDeliveryMethodDto } from './create-delivery-method.dto';

export class UpdateDeliveryMethodDto extends PartialType(CreateDeliveryMethodDto) {}
