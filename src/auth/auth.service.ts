import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { AdminDocument } from '../admin/schemas/admin.schema';
import { SignInAdminDto } from '../admin/dto/sign-in-admin.dto';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt'
import { CustomerDocument } from '../customers/schemas/customer.schema';
import { CustomersService } from '../customers/customers.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly customerService: CustomersService
  ) {}

  async generateTokenforAdmin(admin: AdminDocument) {
    const payload = {
      id: admin.id,
      is_creator: admin.is_creator,
      email: admin.email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async signInAdmin(signInDto: SignInAdminDto, res: Response) {
    const Admin = await this.adminService.findByEmail(signInDto.email);
    if (!Admin) {
      throw new BadRequestException("Bunday Admin mavjud emas!");
    }
    const isValid = await bcrypt.compare(
      signInDto.password,
      Admin.hashed_password
    );
    if (!isValid) {
      throw new BadRequestException("Email yoki Password Noto'g'ri");
    }
    const { accessToken, refreshToken } =
      await this.generateTokenforAdmin(Admin);
    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    Admin.hashed_refresh_token = hashed_refresh_token;
    await Admin.save();
    return { message: "Tizimga xush kelibsiz", accessToken };
  }

  async signOutAdmin(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token)
      throw new BadRequestException("Refresh Token mavjud emas!");
    const Admin = await this.adminService.findByToken(refresh_token);
    if (!Admin) throw new BadRequestException("Token Topilmadi");

    Admin.hashed_refresh_token = "";

    res.clearCookie("refresh_token");

    return res.status(200).json({
      success: true,
      message: "Admin  logged out successfully",
    });
  }

  async refresh_token_Admin(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token)
      throw new BadRequestException("Refresh Token mavjud emas!");

    const payload = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const user = await this.adminService.findOne(payload.id);
    if (!user || !user.hashed_refresh_token) {
      throw new UnauthorizedException("Admin topilmadi yoki login qilinmagan");
    }
    const isValid = await bcrypt.compare(
      refresh_token,
      user.hashed_refresh_token
    );
    if (!isValid) throw new UnauthorizedException("Refresh Token noto'g'ri");

    const { accessToken, refreshToken } =
      await this.generateTokenforAdmin(user);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    user.hashed_refresh_token = hashed_refresh_token;
    await user.save();

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      token: accessToken,
    });
  }

  //==================================ALL AUTH FOR CUSTOMERS=================================================
  async generateTokenforCustomer(Customer: CustomerDocument) {
    const payload = {
      id: Customer.id,
      is_active: Customer.is_active,
      email: Customer.email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async signInCustomer(signInDto: SignInAdminDto, res: Response) {
    const Customer = await this.customerService.findByEmail(signInDto.email);
    if (!Customer) {
      throw new BadRequestException("Bunday Customer mavjud emas!");
    }
    const isValid = await bcrypt.compare(
      signInDto.password,
      Customer.hashed_password
    );
    if (!isValid) {
      throw new BadRequestException("Email yoki Password Noto'g'ri");
    }
    const { accessToken, refreshToken } =
      await this.generateTokenforCustomer(Customer);
    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    Customer.hashed_refresh_token = hashed_refresh_token;
    await Customer.save();
    return { message: "Tizimga xush kelibsiz", accessToken };
  }

  async signOutCustomer(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token)
      throw new BadRequestException("Refresh Token mavjud emas!");
    const Customer = await this.customerService.findByToken(refresh_token);
    if (!Customer) throw new BadRequestException("Token Topilmadi");

    Customer.hashed_refresh_token = "";

    res.clearCookie("refresh_token");

    return res.status(200).json({
      success: true,
      message: "Customer  logged out successfully",
    });
  }

  async refresh_token_Customer(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token)
      throw new BadRequestException("Refresh Token mavjud emas!");

    const payload = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const user = await this.customerService.findOne(payload.id);
    if (!user || !user.hashed_refresh_token) {
      throw new UnauthorizedException(
        "Customer topilmadi yoki login qilinmagan"
      );
    }
    const isValid = await bcrypt.compare(
      refresh_token,
      user.hashed_refresh_token
    );
    if (!isValid) throw new UnauthorizedException("Refresh Token noto'g'ri");

    const { accessToken, refreshToken } =
      await this.generateTokenforCustomer(user);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    user.hashed_refresh_token = hashed_refresh_token;
    await user.save();
    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      token: accessToken,
    });
  }
}
