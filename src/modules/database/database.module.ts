import { SequelizeModule } from '@nestjs/sequelize';
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import File from '../file/models/file.model';
import User from '../user/models/user.model';
import Share from '../share/models/share.model';
import Folder from '../folder/models/folder.model';
import SharePermission from '../share-permission/models/share-permission.model';

@Module({})
export class DatabaseModule {
	static register(): DynamicModule {
		return {
			module: DatabaseModule,
			imports: [
				SequelizeModule.forRootAsync({
					imports: [ConfigModule],
					inject: [ConfigService],
					useFactory: (configService: ConfigService) => ({
						synchronize: true,
						autoLoadModels: true,
						host: configService.get('DATABASE_HOST'),
						port: configService.get('DATABASE_PORT'),
						database: configService.get('DATABASE_NAME'),
						dialect: configService.get('DATABASE_DIALECT'),
						password: configService.get('DATABASE_PASSWORD'),
						username: configService.get('DATABASE_USERNAME'),
						models: [File, User, Share, Folder, SharePermission],
					}),
				}),
			],
			providers: [ConfigService],
			exports: [ConfigService],
		};
	}
}
