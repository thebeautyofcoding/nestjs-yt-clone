import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto{

    @IsString()
    @IsNotEmpty()
    content: string;

    videoId: number
    

    userId: number;
}