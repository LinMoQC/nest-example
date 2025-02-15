import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuth } from './dto/create-auth/create-auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('register')
  register(@Body() createAuth: CreateAuth){
    return this.authService.register(createAuth)
  }
}
