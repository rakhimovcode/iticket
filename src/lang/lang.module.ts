import { Module } from '@nestjs/common';
import { LangService } from './lang.service';
import { LangController } from './lang.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lang, LangSchema } from './schemas/lang.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Lang.name,schema:LangSchema}
  ])],
  controllers: [LangController],
  providers: [LangService],
})
export class LangModule {}
