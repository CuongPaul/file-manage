import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_API = 'isPublic';

export const PublicApi = () => SetMetadata('isPublic', true);
