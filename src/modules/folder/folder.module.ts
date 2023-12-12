import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import Folder from './models/folder.model';
import { FolderService } from './services/folder.service';
import { FolderController } from './controllers/folder.controller';

@Module({
	imports: [SequelizeModule.forFeature([Folder])],
	controllers: [FolderController],
	providers: [FolderService],
	exports: [SequelizeModule],
})
export class FolderModule {}
