
import { User } from './../users/users.entity'
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm'
import { PrimaryGeneratedColumn } from 'typeorm'

import { Video } from 'src/videos/videos.entity'

@Entity()
export class VideoLike{
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, (user) => user.videoLikes)
    user:User
   
    @ManyToOne(() => Video, (video) => video.videoLikes, {onDelete: "CASCADE",onUpdate:"CASCADE", cascade: true})
    video: Video;
    

    @PrimaryColumn("int") userId: number;
    @PrimaryColumn("int") videoId: number
    
   
}
