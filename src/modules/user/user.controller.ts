import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/common/decorators/role.decorator';

@UseGuards(RoleGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
    @Get('info')
    info(){
      return 'i am linmoe'
    }

    @Role('user')
    @Get('all')
    getAll(){
      return 'all users'
    }
}
