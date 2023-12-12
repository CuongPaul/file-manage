import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { EnvModule } from './modules/env/env.module';
import { FileModule } from '@modules/file/file.module';
import { UserModule } from '@modules/user/user.module';
import { ShareModule } from '@modules/share/share.module';
import { FolderModule } from '@modules/folder/folder.module';
import { DatabaseModule } from './modules/database/database.module';
import { SharePermissionModule } from '@modules/share-permission/share-permission.module';

@Module({
	imports: [
		FileModule,
		UserModule,
		ShareModule,
		FolderModule,
		EnvModule.register(),
		SharePermissionModule,
		DatabaseModule.register(),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
