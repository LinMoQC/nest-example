import { IsEmail, IsString } from "class-validator";

export class CreateAuth {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
