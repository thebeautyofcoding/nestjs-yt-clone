import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './users/auth.services';
import { UsersService } from './users/users.service';
import { User } from 'src/users/users.entity';
import { View } from './views/views.entity';
import { VideoLike } from './videoLikes/videoLikes.entity';
import { Video } from 'src/videos/videos.entity';

import { Comment } from 'src/comments/comments.entity';
import { Subscription } from './subscriptions/subscriptions.entity';
import { ConfigModule } from '@nestjs/config';
import { VideosModule } from './videos/videos.module';
import { MulterModule } from '@nestjs/platform-express';
import { BullModule } from '@nestjs/bull';

import { VideosController } from './videos/videos.controller';
import { VideoLikesModule } from './videoLikes/videoLikes.module';
import { CommentsModule } from './comments/comments.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppGateway } from './socket/app.gateway';
import { SocketModule } from './socket/socket.module';
import { join } from 'path';
import { ThumbnailsModule } from './thumbnails/thumbnails.module';
import { CurrentUserInterceptor } from './users/interceptors/current-user.interceptors';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    VideosModule,
    BullModule.registerQueue({
      name: 'video',
    }),

    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MulterModule.register({ dest: './static/videos' }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'youtubeclone',

      entities: [User, Video, VideoLike, Comment, View, Subscription],
      synchronize: true,
    }),
    UserModule,
    VideoLikesModule,
    CommentsModule,
    SocketModule,
    ThumbnailsModule,
  ],
  exports: [TypeOrmModule, BullModule],
  controllers: [UsersController, VideosController],
  providers: [
    UsersService,
    AuthService,
    AppService,
    AppGateway,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
})
export class AppModule {}
