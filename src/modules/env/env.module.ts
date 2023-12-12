import * as Joi from 'joi';
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class EnvModule {
	static register(): DynamicModule {
		return {
			module: EnvModule,
			imports: [
				ConfigModule.forRoot({
					cache: true,
					isGlobal: true,
					expandVariables: true,
					validationOptions: { abortEarly: false },
					validationSchema: Joi.object({
						API_PORT: Joi.number().default(4000),
						DATABASE_HOST: Joi.string().required(),
						DATABASE_NAME: Joi.string().required(),
						DATABASE_PORT: Joi.number().default(5432),
						DATABASE_PASSWORD: Joi.string().required(),
						DATABASE_USERNAME: Joi.string().required(),
						NODE_ENV: Joi.string()
							.valid('test', 'staging', 'production', 'development')
							.default('development'),
					}),
					envFilePath:
						process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
				}),
			],
			providers: [ConfigService],
			exports: [ConfigService],
		};
	}
}
