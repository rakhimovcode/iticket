import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerSchema: Model<Customer>,
    private readonly jwtService: JwtService
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const { password, confirm_password} = createCustomerDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Password do not match!");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.customerSchema.create({
      ...createCustomerDto,
      hashed_password,
    });
  }

  findAll() {
    return this.customerSchema.find({});
  }

  findOne(id: string) {
    return this.customerSchema.findOne({ _id: id });
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerSchema.findByIdAndUpdate(id, updateCustomerDto);
  }

  remove(id: string) {
    return this.customerSchema.findByIdAndDelete(id);
  }
  findByEmail(email: string) {
    return this.customerSchema.findOne({ email });
  }
  async findByToken(refresh_token: string): Promise<Customer | null> {
    if (!refresh_token) {
      throw new BadRequestException("Refresh Token berilmagan!");
    }
    try {
      const decoded = this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      }) as { id: string };

      const customer = await this.customerSchema
        .findOne({ _id: decoded.id })
        .exec();
      return customer;
    } catch (error) {
      throw new BadRequestException("Invalid or expired refresh token!");
    }
  }
}
