import {IsEmail, IsEnum, IsNotEmpty, IsString} from "class-validator"

export class CreateUserDto {

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @IsEnum(['engineer', 'admin', 'intern'], {
        message: 'Role must be either engineer, admin, or intern'
    })
    role: 'engineer' | 'admin' | 'intern'
}

