import {
	IsEmail,
	MaxLength,
	IsNotEmpty,
	IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	@IsNotEmpty()
	@MaxLength(50)
	email: string;

	@IsNotEmpty()
	@MaxLength(50)
	username: string;

	@IsNotEmpty()
	@IsStrongPassword()
	password: string;
}
