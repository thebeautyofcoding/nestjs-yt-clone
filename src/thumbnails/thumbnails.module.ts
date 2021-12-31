import { Module, Global } from '@nestjs/common';
import { ThumbnailsController } from './thumbnails.controller'



@Module({
 controllers: [ThumbnailsController],
 providers: [],
 exports: [],
})
export class ThumbnailsModule {}