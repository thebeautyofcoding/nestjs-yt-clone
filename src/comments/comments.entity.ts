import { User } from "../users/users.entity"
import { Column, ManyToOne, PrimaryColumn } from "typeorm"
import { Entity } from 'typeorm'
import { PrimaryGeneratedColumn } from 'typeorm'
import { Video } from "src/videos/videos.entity";
@Entity()
export class Comment{

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(()=>User, (user)=>user.comments, )
    user: User

    @ManyToOne(() => Video, (video) => video.comments, )
    video: Video;



    @Column({length:1000})
    content: string;

    @PrimaryColumn('int')
    videoId: number;

    @PrimaryColumn('int')
    userId: number;
}