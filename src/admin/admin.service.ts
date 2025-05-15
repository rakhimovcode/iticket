import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminSchema: Model<Admin>,
    private readonly jwtService: JwtService
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password != confirm_password) {
      throw new BadRequestException("Password don't match");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.adminSchema.create({ ...createAdminDto, hashed_password });
  }

  findAll() {
    return this.adminSchema.find({});
  }

  findOne(id: string) {
    return this.adminSchema.findOne({ _id: id });
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminSchema.findByIdAndUpdate(id, updateAdminDto);
  }

  remove(id: string) {
    return this.adminSchema.findByIdAndDelete(id);
  }
  findByEmail(email: string) {
    return this.adminSchema.findOne({ email });
  }
  async findByToken(refresh_token: string): Promise<Admin | null> {
    if (!refresh_token) {
      throw new BadRequestException("Refresh Token berilmagan!");
    }
    try {
      const decoded = this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      }) as { id: string }; 

      const admin = await this.adminSchema.findOne({ _id: decoded.id }).exec();
      return admin;
    } catch (error) {
      throw new BadRequestException("Invalid or expired refresh token!");
    }
  }
}
