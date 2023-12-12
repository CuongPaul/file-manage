import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { EnvModule } from './modules/env/env.module';
import { FileModule } from '@modules/file/file.module';
import { UserModule } from '@modules/user/user.module';
import { FolderModule } from '@modules/folder/folder.module';
import { PostgresModule } from './modules/database/postgres.module';

@Module({
	imports: [
		FileModule,
		UserModule,
		FolderModule,
		EnvModule.register(),
		PostgresModule.register(),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
