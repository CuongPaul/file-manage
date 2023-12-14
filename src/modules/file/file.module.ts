import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import File from './models/file.model';
import { FileService } from './services/file.service';
import { S3Service } from '@shared/services/s3.service';
import { FileController } from './controllers/file.controller';

@Module({
	imports: [SequelizeModule.forFeature([File])],
	controllers: [FileController],
	providers: [S3Service, FileService],
	exports: [SequelizeModule],
})
export class FileModule {}
