import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { databaseConfig } from './configs/configuration.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			expandVariables: true,
			load: [databaseConfig],
			envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',

			validationOptions: { abortEarly: false },
			validationSchema: Joi.object({
				PORT: Joi.number().default(4000),
				NODE_ENV: Joi.string()
					.valid('test', 'staging', 'production', 'development')
					.default('development'),
			}),
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
