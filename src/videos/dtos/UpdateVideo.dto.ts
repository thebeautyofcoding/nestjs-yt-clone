
import { IsNotEmpty, IsString } from 'class-validator'
export class UpdateVideoDto{

@IsNotEmpty()
    @IsString()
    thumbnail: string;


    videoId: string;

    userId: number;
}