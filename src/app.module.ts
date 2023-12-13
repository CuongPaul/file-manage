import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { S3Module } from '@modules/s3/s3.module';
import { AppController } from './app.controller';
import { EnvModule } from './modules/env/env.module';
import { FileModule } from '@modules/file/file.module';
import { UserModule } from '@modules/user/user.module';
import { ShareModule } from '@modules/share/share.module';
import { FolderModule } from '@modules/folder/folder.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
	imports: [
		S3Module,
		FileModule,
		UserModule,
		ShareModule,
		FolderModule,
		EnvModule.register(),
		DatabaseModule.register(),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
