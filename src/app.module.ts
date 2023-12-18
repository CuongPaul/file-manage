import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { EnvModule } from './modules/env/env.module';
import { AuthModule } from '@modules/auth/auth.module';
import { FileModule } from '@modules/file/file.module';
import { UserModule } from '@modules/user/user.module';
import { ShareModule } from '@modules/share/share.module';
import { FolderModule } from '@modules/folder/folder.module';
import { DatabaseModule } from './modules/database/database.module';
import { TransformInterceptor } from '@interceptors/transform.interceptor';
import { GlobalExceptionFilter } from '@exception-filters/global-exception.filter';

@Module({
	imports: [
		AuthModule,
		FileModule,
		UserModule,
		ShareModule,
		FolderModule,
		EnvModule.register(),
		DatabaseModule.register(),
	],
	controllers: [AppController],
	providers: [
		AppService,
		{ provide: APP_FILTER, useClass: GlobalExceptionFilter },
		{ provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
	],
})
export class AppModule {}
