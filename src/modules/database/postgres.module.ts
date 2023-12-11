import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class PostgresModule {
	static register(): DynamicModule {
		return {
			module: PostgresModule,
			imports: [
				TypeOrmModule.forRootAsync({
					imports: [ConfigModule],
					inject: [ConfigService],
					useFactory: (configService: ConfigService) => ({
						type: 'postgres',
						synchronize: true,
						host: configService.get('DATABASE_HOST'),
						port: configService.get('DATABASE_PORT'),
						password: configService.get('POSTGRES_PASSWORD'),
						username: configService.get('POSTGRES_USERNAME'),
						entities: [__dirname + '/../**/*.entity{.ts,.js}'],
						database: configService.get('POSTGRES_DATABASE_NAME'),
					}),
				}),
			],
			providers: [ConfigService],
			exports: [ConfigService],
		};
	}
}
