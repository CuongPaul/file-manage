import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import File from './models/file.model';
import { FileService } from './services/file.service';
import { FileController } from './controllers/file.controller';

@Module({
	imports: [SequelizeModule.forFeature([File])],
	controllers: [FileController],
	providers: [FileService],
	exports: [SequelizeModule],
})
export class FileModule {}
