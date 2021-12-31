import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { VideoLike } from './videoLikes.entity'
import { CreateVideoDto } from './../videos/dtos/createVideo.dto'
import { createVideoLikeDto } from './dtos/createVideoLike.dto'
import { Video } from 'src/videos/videos.entity'

@Injectable()
export class VideoLikesService {
    constructor(@InjectRepository(VideoLike) private repo:Repository<VideoLike>) {  
}

    
    async createOrDeleteVideoLike(videoId, userId) {
        const result = await this.repo.createQueryBuilder().where('userId= :userId', { userId }).andWhere('videoId= :videoId', { videoId }).getOne()
        console.log(userId)
        if (!result) {
            const videoLike =await this.repo.create({ videoId:videoId, userId:userId })
            
            this.repo.save(videoLike)
            console.log('DONSO')
        } else {
            this.repo.delete(result)
        }
        
    }
}