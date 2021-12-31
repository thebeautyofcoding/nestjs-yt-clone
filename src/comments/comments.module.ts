import { Module } from '@nestjs/common';



import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsController } from 'src/comments/comments.controller'


import { Comment } from 'src/comments/comments.entity'
import { CommentsService } from './comments.service';


@Module({
  imports: [TypeOrmModule.forFeature([Comment]), ],



  controllers: [CommentsController],
providers: [
   
 CommentsService
    
  ],
  exports: [TypeOrmModule,CommentsService ]
})
export class CommentsModule {}