import { Module } from '@nestjs/common';
import { HumanCategoryService } from './human-category.service';
import { HumanCategoryController } from './human-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HumanCategory, HumanCategorySchema } from './schemas/human-category.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:HumanCategory.name,schema:HumanCategorySchema}
  ])],
  controllers: [HumanCategoryController],
  providers: [HumanCategoryService],
})
export class HumanCategoryModule {}
