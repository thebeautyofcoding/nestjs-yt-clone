import { InjectQueue } from "@nestjs/bull";
import { Controller, Post, UploadedFile, UseInterceptors, Injectable, Body, Query, Session, Get, Header, Headers, Res, Param } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { VideoProducerService } from './videos.producer.service'
import { Video } from 'src/videos/videos.entity'
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { CreateVideoDto } from './dtos/createVideo.dto'
import { User } from './../users/users.entity'
import { Repository } from 'typeorm'
import { VideoDto } from './dtos/video.dto'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { Response } from "express";
import { UpdateVideoDto } from "./dtos/UpdateVideo.dto";
import { UsersService } from './../users/users.service'









@Serialize(VideoDto)
@Controller('videos')

export class VideosController{
    constructor( private service: VideoProducerService, private usersService: UsersService) {
    
  }
  
  @Get('/')
  async getAllVideos() {
    return await this.service.findAllVideos()
    }
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file', {
            dest: "src/static/videos/"  }))
    async uploadVideo(@Body() body: CreateVideoDto, @UploadedFile() file: Express.Multer.File,) {
   
   
      const video = await this.service.createVideo(
        file.path,  body.description, body.title, body.userId
      )  
     
    await this.service.convertToH264(file.path, JSON.stringify(video.id))
   await this.service.get3Screenshots(file.path, JSON.stringify(video.id))
    
       
      return  video
  } 
  
  @Get('/:id')
  streamVideo(@Headers('range') range, @Param('id') id:number, @Res() res: any) {
    console.log(id)
    const { file, head } =  this.service.streamVideo(id, range)
    res.set( head )
    res.status('206')
    return file.pipe(res)
  }

 
  @Post('/update')
  updateVideoWithThumbnailPath(@Body() body:UpdateVideoDto):Promise<Video> {
    return  this.service.updateVideo(parseInt(body.videoId), body.thumbnail)

    

    
  }

}