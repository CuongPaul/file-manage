import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			expandVariables: true,
			validationOptions: { abortEarly: false },
			validationSchema: Joi.object({
				POSTGRES_DATABASE_URL: Joi.string(),
				API_PORT: Joi.number().default(4000),
				DATABASE_HOST: Joi.string().required(),
				DATABASE_PORT: Joi.number().default(5432),
				POSTGRES_PASSWORD: Joi.string().required(),
				POSTGRES_USERNAME: Joi.string().required(),
				POSTGRES_DATABASE_NAME: Joi.string().required(),
				NODE_ENV: Joi.string()
					.valid('test', 'staging', 'production', 'development')
					.default('development'),
			}),
			envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
		}),
	],
	exports: [ConfigModule],
})
export class EnvModule {}
