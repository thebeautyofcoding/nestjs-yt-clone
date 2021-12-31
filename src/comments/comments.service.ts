
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Comment } from './comments.entity'
import { InjectRepository } from '@nestjs/typeorm'
@Injectable()
export class CommentsService{
    constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {
        
    }


    async create(content: string, videoId: number, userId: number) {
     
        const comment = await this.repo.create({ content, videoId, userId })
        
        return this.repo.save(comment)
    }

}