import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				entities: [],
				type: 'postgres',
				synchronize: true,
				host: configService.get('DATABASE_HOST'),
				port: configService.get('DATABASE_PORT'),
				password: configService.get('POSTGRES_PASSWORD'),
				username: configService.get('POSTGRES_USERNAME'),
				database: configService.get('POSTGRES_DATABASE_NAME'),
			}),
		}),
	],
	exports: [TypeOrmModule],
})
export class PostgresModule {}
