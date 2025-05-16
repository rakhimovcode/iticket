import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { CustomerAddressModule } from './customer-address/customer-address.module';
import { CustomerCardModule } from './customer-card/customer-card.module';
import { VenueModule } from './venue/venue.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AdminModule,
    AuthModule,
    CustomersModule,
    RegionModule,
    DistrictModule,
    CustomerAddressModule,
    CustomerCardModule,
    VenueModule,
  ],
})
export class AppModule {}
