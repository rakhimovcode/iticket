export class CreateBookingDto {
  cartId: number;

  created_at: string;

  finished_at: string;

  paymentMethodId: number;

  deliveryMethodId: number;

  status: string;
}
