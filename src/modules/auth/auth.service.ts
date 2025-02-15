import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAuth } from './dto/create-auth/create-auth';
import { UserService } from '../user/user.service';
import { LoginAuth } from './dto/login-auth/login-auth';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }
    async register(createAuth: CreateAuth) {
        try {
            const userByUsername = await this.userService.findByUsername(createAuth.username)
            const userByEmail = await this.userService.findByEmail(createAuth.email)
            if (userByEmail || userByUsername) throw new BadRequestException('User already exists');
            return this.userService.createUser(createAuth.email, createAuth.password, createAuth.username)
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }

    async login(loginAuth: LoginAuth) {
        try {
            const user = await this.userService.findByEmail(loginAuth.email)
            if (!user) throw new BadRequestException('User not exists');

            // 判断传入的密码加密后是否与数据库内的一致
            const isPasswordMatched = await verify(user.password, loginAuth.password);
            if (!isPasswordMatched) throw new ForbiddenException('密码错误');

            return 'login success'
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }
}
