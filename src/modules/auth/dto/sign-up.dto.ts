import {
	IsEmail,
	MaxLength,
	IsNotEmpty,
	IsStrongPassword,
} from 'class-validator';

export class SignUpDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	@MaxLength(50)
	username: string;

	@IsNotEmpty()
	@IsStrongPassword()
	password: string;
}
