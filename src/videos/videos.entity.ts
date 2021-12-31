import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  JoinTable,
} from 'typeorm';
import { User } from 'src/users/users.entity';
import { VideoLike } from 'src/videoLikes/videoLikes.entity';
import { Comment } from 'src/comments/comments.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  path: string;

  @Column({ length: 100, nullable: true })
  thumbnail: string;

  @ManyToOne(() => User, (user) => user.videos)
  user: User;

  @Column({ length: 500 })
  description: string;

  @Column({ length: 150 })
  title: string;

  @OneToMany((type) => VideoLike, (videoLike) => videoLike.user, {
    cascade: true,
  })
  userWhoLiked: User[];

  @OneToMany(() => VideoLike, (videoLikes) => videoLikes.video)
  videoLikes: VideoLike[];

  @OneToMany(() => Comment, (comment) => comment.video)
  comments: Comment[];
}
