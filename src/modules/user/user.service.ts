import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {hash} from 'argon2'

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

    findByEmail(email: string){
        return this.prisma.user.findUnique({
            where: {email}
        })
    }

    findByUsername(username: string){
        return this.prisma.user.findUnique({
            where: {username}
        })
    }

    async createUser(email: string,password: string,username: string){
        const hash_pwd = await hash(password)
        return this.prisma.user.create({
            data: {
                username,
                password: hash_pwd,
                email,
                roles: [1]
            }
        })
    }
}
