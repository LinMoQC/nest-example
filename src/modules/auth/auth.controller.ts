import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuth } from './dto/create-auth/create-auth';
import { LoginAuth } from './dto/login-auth/login-auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('register')
  register(@Body() createAuth: CreateAuth){
    return this.authService.register(createAuth)
  }

  @HttpCode(200)
  @Post('login')
  login(@Body() loginAuth: LoginAuth){
    return this.authService.login(loginAuth)
  }
}
