import {
	Get,
	Post,
	Body,
	Patch,
	Param,
	Query,
	Delete,
	Controller,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { QueryFoldersDto } from '../dto/get-folders.dto';
import { FolderService } from '../services/folder.service';
import { CreateFolderDto } from '../dto/create-folder.dto';
import { UpdateFolderDto } from '../dto/update-folder.dto';

@ApiTags('Folder')
@Controller('folder')
export class FolderController {
	constructor(private readonly folderService: FolderService) {}

	@Post()
	create(@Body() createFolderDto: CreateFolderDto) {
		return this.folderService.create(createFolderDto);
	}

	@Get()
	findAll(@Query() queryFolders: QueryFoldersDto) {
		return this.folderService.findAll(queryFolders);
	}

	@Get(':id')
	findOne(@Param('id') id: string, @Query() query: { user_id: string }) {
		return this.folderService.findOne(id, query.user_id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Query() query: { user_id: string },
		@Body() updateFolderDto: UpdateFolderDto,
	) {
		return this.folderService.update(id, query.user_id, updateFolderDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.folderService.remove(id);
	}
}
