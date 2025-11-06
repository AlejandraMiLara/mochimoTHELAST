import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private setTokenCookie(response: Response, accessToken: string) {
    response.cookie('access_token', accessToken, {
      httpOnly: true, 
      secure: false, 
      sameSite: 'strict',
      maxAge: 3600000,
    });
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.register(registerDto);
    this.setTokenCookie(response, accessToken);
    return { message: 'Registro exitoso' };
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.login(loginDto);
    this.setTokenCookie(response, accessToken);
    return { message: 'Login exitoso' };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });
    return { message: 'Logout exitoso' };
  }
}