import { PartialType } from '@nestjs/swagger';
import { CreateVenuePhotoDto } from './create-venue-photo.dto';

export class UpdateVenuePhotoDto extends PartialType(CreateVenuePhotoDto) {}
