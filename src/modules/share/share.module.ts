import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import Share from './models/share.model';
import { ShareService } from './services/share.service';
import { ShareController } from './controllers/share.controller';

@Module({
	imports: [SequelizeModule.forFeature([Share])],
	controllers: [ShareController],
	providers: [ShareService],
	exports: [SequelizeModule],
})
export class ShareModule {}
