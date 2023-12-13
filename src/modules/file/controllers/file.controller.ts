import {
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Controller,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateFileDto } from '../dto/create-file.dto';
import { FileService } from '../services/file.service';
import { UpdateFileDto } from '../dto/update-file.dto';
// import { S3Service } from '@modules/s3/services/s3.service';

@ApiTags('File')
@Controller('file')
export class FileController {
	constructor(
		// private readonly s3Service: S3Service,
		private readonly fileService: FileService,
	) {}

	@Post()
	@UseInterceptors(
		FileInterceptor('file_upload', {
			storage: diskStorage({
				destination: './uploads',
				filename: (_req, file, cb) => cb(null, file.originalname),
			}),
		}),
	)
	async create(
		@Body() createFileDto: CreateFileDto,
		@UploadedFile() fileUpload: Express.Multer.File,
	) {
		// const fileUrl = await this.s3Service.uploadFile(
		// 	`common/${fileUpload.originalname}`,
		// 	fileUpload,
		// );

		return this.fileService.create(
			'fileUrl',
			fileUpload.size,
			fileUpload.filename,
			fileUpload.mimetype,
			{ ...createFileDto },
		);
	}

	@Get()
	findAll() {
		return this.fileService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.fileService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
		return this.fileService.update(id, updateFileDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.fileService.remove(id);
	}
}
