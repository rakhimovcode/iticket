import { PartialType } from '@nestjs/swagger';
import { CreateSeatTypeDto } from './create-seat-type.dto';

export class UpdateSeatTypeDto extends PartialType(CreateSeatTypeDto) {}
