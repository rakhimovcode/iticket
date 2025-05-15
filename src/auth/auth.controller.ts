import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAdminDto } from '../admin/dto/sign-in-admin.dto';
import { Request, Response } from 'express';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-in-admin")
  @HttpCode(200)
  async signIn(
    @Body() signInDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInAdmin(signInDto, res);
  }

  @Post("sign-out-admin")
  @HttpCode(200)
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutAdmin(req, res);
  }

  @Get("refresh-admin")
  @HttpCode(200)
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refresh_token_Admin(req, res);
  }

  @Post("sign-in")
  @HttpCode(200)
  async signInCustomer(
    @Body() signInDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInCustomer(signInDto, res);
  }

  @Post("sign-out")
  @HttpCode(200)
  async signOutCustomer(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutCustomer(req, res);
  }

  @Get("refresh")
  @HttpCode(200)
  async refreshTokenCustomer(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refresh_token_Customer(req, res);
  }
}
