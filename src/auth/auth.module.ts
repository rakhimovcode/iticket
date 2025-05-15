import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports:[ JwtModule.register({
      global:true
    }),AdminModule,CustomersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
