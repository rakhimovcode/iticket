import { PartialType } from '@nestjs/swagger';
import { CreateHumanCategoryDto } from './create-human-category.dto';

export class UpdateHumanCategoryDto extends PartialType(CreateHumanCategoryDto) {}
