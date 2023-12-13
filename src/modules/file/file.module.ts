import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

import File from './models/file.model';
import { S3Module } from '@modules/s3/s3.module';
import { FileService } from './services/file.service';
import { S3Service } from '@modules/s3/services/s3.service';
import { FileController } from './controllers/file.controller';

@Module({
	imports: [S3Module, ConfigModule, SequelizeModule.forFeature([File])],
	controllers: [FileController],
	providers: [S3Service, FileService, ConfigService],
	exports: [SequelizeModule],
})
export class FileModule {}
