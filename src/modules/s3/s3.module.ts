import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { S3Service } from './services/s3.service';

@Module({
	imports: [ConfigModule],
	providers: [S3Service, ConfigService],
	exports: [S3Service],
})
export class S3Module {}
