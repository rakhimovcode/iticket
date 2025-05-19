import { Injectable } from '@nestjs/common';
import { CreateLangDto } from './dto/create-lang.dto';
import { UpdateLangDto } from './dto/update-lang.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Lang } from './schemas/lang.schema';
import { Model } from 'mongoose';

@Injectable()
export class LangService {
  constructor(@InjectModel(Lang.name) private readonly LangSchema:Model<Lang>){}
  create(createLangDto: CreateLangDto) {
    return this.LangSchema.create(createLangDto)
  }

  findAll() {
    return this.LangSchema.find({})
  }

  findOne(id: string) {
    return this.LangSchema.findById(id)
  }

  update(id: string, updateLangDto: UpdateLangDto) {
    return this.LangSchema.findByIdAndUpdate(id,updateLangDto)
  }

  remove(id: string) {
    return this.LangSchema.findByIdAndDelete(id)
  }
}
