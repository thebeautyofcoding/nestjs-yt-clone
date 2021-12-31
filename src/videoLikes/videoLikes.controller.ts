import { Controller, Post, Query, Session } from "@nestjs/common";
import { Video } from "src/videos/videos.entity";
import { VideoLikesService } from './videoLikes.service'
import { VideoDto } from './../videos/dtos/video.dto'
import { Serialize } from 'src/interceptors/serialize.interceptor'
@Serialize(VideoDto)
@Controller('/video')
export class VideoLikesController{

    constructor(private service: VideoLikesService){
    }
    @Post('/like')
    async likeOrUnlike(@Query() id: Video, @Session() session: any) {
     
        console.log(session.userId)
      return  await this.service.createOrDeleteVideoLike(id['id'], session.userId)
    }
}