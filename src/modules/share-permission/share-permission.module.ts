import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import SharePermission from './models/share-permission.model';
import { SharePermissionService } from './services/share-permission.service';
import { SharePermissionController } from './controllers/share-permission.controller';

@Module({
	imports: [SequelizeModule.forFeature([SharePermission])],
	controllers: [SharePermissionController],
	providers: [SharePermissionService],
	exports: [SequelizeModule],
})
export class SharePermissionModule {}
