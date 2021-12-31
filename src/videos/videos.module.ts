import { Module } from '@nestjs/common';

import { MulterModule } from '@nestjs/platform-express';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/videos/videos.entity'
import { VideosController } from './videos.controller'
import { VideoProducerService } from './videos.producer.service'
import { BullModule } from '@nestjs/bull';
import { VideoProcessingConsumer } from './videos.consumer'
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';

import { UserModule } from './../users/users.module'
@Module({
  imports: [TypeOrmModule.forFeature([Video]),   BullModule.registerQueue({



  name: 'video',

}),UserModule, UserModule,MulterModule.register({ dest: '../static/videos' }),], 



  controllers: [VideosController],
providers: [
   
      VideoProducerService,VideoProcessingConsumer
    
  ],
  exports: [TypeOrmModule,VideoProducerService, ]
})
export class VideosModule {}