
import { Expose } from 'class-transformer'
import { User } from 'src/users/users.entity';
import { VideoLike } from 'src/videoLikes/videoLikes.entity'

export class VideoDto {
  @Expose()
   
  title: string;


  @Expose()
  id: string;
    @Expose()
    description: string;
    

    @Expose()
  thumbnail: string;
  




  @Expose()
  videoLikes: VideoLike[];
  

  @Expose()
    userWhoLiked: User[];

  @Expose()
  comments: Comment[];
  @Expose()
  user: User;

  @Expose()
  userId: number;
    
}
