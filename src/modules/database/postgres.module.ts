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
						models: [User, Folder],
						host: configService.get('DATABASE_HOST'),
						port: configService.get('DATABASE_PORT'),
						database: configService.get('DATABASE_NAME'),
						dialect: configService.get('DATABASE_DIALECT'),
						password: configService.get('DATABASE_PASSWORD'),
						username: configService.get('DATABASE_USERNAME'),
					}),
				}),
			],
			providers: [ConfigService],
			exports: [ConfigService],
		};
	}
}
