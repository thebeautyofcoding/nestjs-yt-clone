import { Module } from '@nestjs/common';

import { MulterModule } from '@nestjs/platform-express';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/videos/videos.entity'
import { VideoLikesController } from './videoLikes.controller'
import { VideoLikesService } from './videoLikes.service'

import { VideoLike } from 'src/videoLikes/videoLikes.entity'


@Module({
  imports: [TypeOrmModule.forFeature([VideoLike, Video]), ],



  controllers: [VideoLikesController],
providers: [
   
    VideoLikesService, 
    
  ],
  exports: [TypeOrmModule,VideoLikesService, ]
})
export class VideoLikesModule {}