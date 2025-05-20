import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Booking } from "./schema/booking.schema";

import { Model, isValidObjectId } from "mongoose";
import { Cart } from "../cart/schemas/cart.schema";
import { PaymentMethod } from "../payment-method/schemas/payment-method.schema";
import { DeliveryMethod } from "../delivery-method/schemas/delivery-method.schema";

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
    @InjectModel(PaymentMethod.name)
    private readonly paymentMethodModel: Model<PaymentMethod>,
    @InjectModel(DeliveryMethod.name)
    private readonly deliveryMethodModel: Model<DeliveryMethod>
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const { cartId, paymentMethodId, deliveryMethodId } = createBookingDto;

    if (!isValidObjectId(cartId)) {
      throw new BadRequestException("Invalid cartId format");
    }
    if (!isValidObjectId(paymentMethodId)) {
      throw new BadRequestException("Invalid paymentMethodId format");
    }
    if (!isValidObjectId(deliveryMethodId)) {
      throw new BadRequestException("Invalid deliveryMethodId format");
    }

    const cart = await this.cartModel.findById(cartId).exec();
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${cartId} not found`);
    }

    const paymentMethod = await this.paymentMethodModel
      .findById(paymentMethodId)
      .exec();
    if (!paymentMethod) {
      throw new NotFoundException(
        `Payment method with ID ${paymentMethodId} not found`
      );
    }

    const deliveryMethod = await this.deliveryMethodModel
      .findById(deliveryMethodId)
      .exec();
    if (!deliveryMethod) {
      throw new NotFoundException(
        `Delivery method with ID ${deliveryMethodId} not found`
      );
    }

    try {
      const newBooking = new this.bookingModel({
        cartId,
        paymentMethodId,
        deliveryMethodId,
        createdAt: new Date(),
      });

      const savedBooking = await newBooking.save();
      return savedBooking;
    } catch (error) {
      throw new BadRequestException(
        `Failed to create booking: ${error.message}`
      );
    }
  }

  async findAll() {
    return this.bookingModel.find().exec();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid booking ID format");
    }
    const booking = await this.bookingModel.findById(id).exec();
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid booking ID format");
    }
    const updatedBooking = await this.bookingModel
      .findByIdAndUpdate(id, updateBookingDto, { new: true })
      .exec();
    if (!updatedBooking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return updatedBooking;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid booking ID format");
    }
    const deletedBooking = await this.bookingModel.findByIdAndDelete(id).exec();
    if (!deletedBooking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return deletedBooking;
  }
}
