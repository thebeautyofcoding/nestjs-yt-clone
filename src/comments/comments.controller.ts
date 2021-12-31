import { Body, Controller, Post } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from './dtos/createComment.dto'


@Controller('video/comments')
export class CommentsController{
    constructor(private service: CommentsService) {
    
    }
    
    @Post('')
    createComment(@Body() body: CreateCommentDto) {
        console.log(this.service)
     return this.service.create(body.content, body.videoId, body.userId)
        
    }


}