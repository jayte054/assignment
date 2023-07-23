import { IsEmail, Length, Matches } from "class-validator";
import { Admin } from "typeorm";
export class User implements UserModel {
    id?: string;

    @IsEmail({}, {message: "invalid email address format"})
    email: string | any;

    @Length(6,10, {message: "password must be between 6 and 10 characters"})
    @Matches(/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: 'Password must contain at least one special character',
      })
    password: string | any;

    role: "user" | "admin" | undefined;
}

export interface UserModel {
    id?: string;
    email: string;
    password: string;
    role: "user" | "admin" | undefined
}