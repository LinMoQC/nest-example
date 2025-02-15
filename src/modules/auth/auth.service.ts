import { BadRequestException,ForbiddenException,Injectable } from '@nestjs/common';
import { CreateAuth } from './dto/create-auth/create-auth';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}
    async register(createAuth: CreateAuth){
        try{
            const userByUsername = await this.userService.findByUsername(createAuth.username)
            const userByEmail = await this.userService.findByEmail(createAuth.email)
            if(userByEmail || userByUsername) throw new BadRequestException('User already exists');
            return this.userService.createUser(createAuth.email,createAuth.password,createAuth.username)
        }catch(error){
            throw new ForbiddenException(error)
        }
    }
}
