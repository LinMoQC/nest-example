import { IsEmail, IsString } from "class-validator";

export class LoginAuth {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
