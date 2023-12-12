import {
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Controller,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SharePermissionService } from '../services/share-permission.service';
import { CreateSharePermissionDto } from '../dto/create-share-permission.dto';
import { UpdateSharePermissionDto } from '../dto/update-share-permission.dto';

@ApiTags('Share permission')
@Controller('share-permission')
export class SharePermissionController {
	constructor(
		private readonly sharePermissionService: SharePermissionService,
	) {}

	@Post()
	create(@Body() createSharePermissionDto: CreateSharePermissionDto) {
		return this.sharePermissionService.create(createSharePermissionDto);
	}

	@Get()
	findAll() {
		return this.sharePermissionService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.sharePermissionService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateSharePermissionDto: UpdateSharePermissionDto,
	) {
		return this.sharePermissionService.update(id, updateSharePermissionDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.sharePermissionService.remove(id);
	}
}
