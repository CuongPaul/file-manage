import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FolderEntity } from './entities/folder.entity';
import { FolderService } from './services/folder.service';
import { FolderController } from './controllers/folder.controller';
import { FolderRepository } from './repositories/folder.repository';

@Module({
	imports: [TypeOrmModule.forFeature([FolderEntity])],
	controllers: [FolderController],
	providers: [FolderService, FolderRepository],
	exports: [TypeOrmModule],
})
export class FolderModule {}
