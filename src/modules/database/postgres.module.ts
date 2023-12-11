import { SequelizeModule } from '@nestjs/sequelize';
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import User from '../user/models/user.models';
import Folder from '../folder/models/folder.model';

@Module({})
export class PostgresModule {
	static register(): DynamicModule {
		return {
			module: PostgresModule,
			imports: [
				SequelizeModule.forRootAsync({
					imports: [ConfigModule],
					inject: [ConfigService],
					useFactory: (configService: ConfigService) => ({
						synchronize: true,
						dialect: 'postgres',
						autoLoadModels: true,
						models: [User, Folder],
						host: configService.get('DATABASE_HOST'),
						port: configService.get('DATABASE_PORT'),
						password: configService.get('POSTGRES_PASSWORD'),
						username: configService.get('POSTGRES_USERNAME'),
						database: configService.get('POSTGRES_DATABASE_NAME'),
						logging: configService.get('NODE_ENV') === 'development',
					}),
				}),
			],
			providers: [ConfigService],
			exports: [ConfigService],
		};
	}
}
