
 import { IsEmail, IsString } from 'class-validator';
import { User } from 'src/users/users.entity';
import { Video } from 'src/videos/videos.entity';
import { PrimaryGeneratedColumn } from 'typeorm';
export class createVideoLikeDto{
   

     
      userId: number;
    
      
        videoId: number;
        
  
    
    


}