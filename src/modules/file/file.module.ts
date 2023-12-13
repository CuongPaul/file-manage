import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import File from './models/file.model';
import { S3Module } from '@modules/s3/s3.module';
import { FileService } from './services/file.service';
import { S3Service } from '@modules/s3/services/s3.service';
import { FileController } from './controllers/file.controller';

@Module({
	imports: [S3Module, SequelizeModule.forFeature([File])],
	controllers: [FileController],
	providers: [S3Service, FileService],
	exports: [SequelizeModule],
})
export class FileModule {}
