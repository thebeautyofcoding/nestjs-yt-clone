import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Video } from 'src/videos/videos.entity';
import { VideoLike } from 'src/videoLikes/videoLikes.entity';
import { Comment } from 'src/comments/comments.entity';

import { View } from 'src/views/views.entity';
import { Subscription } from 'src/subscriptions/subscriptions.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 200, default: '' })
  avatar: string;
  @Column({ length: 200, default: '' })
  cover: string;

  @Column({ length: 500 })
  about: string;

  @OneToMany(() => Video, (video) => video.user)
  videos: Video[];

  @OneToMany(() => VideoLike, (videoLike) => videoLike.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  videoLikes: VideoLike[];

  @OneToMany(() => Comment, (comment) => comment.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  comments: Comment[];
  @OneToMany(() => View, (view) => view.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  views: View[];

  @OneToMany(() => Subscription, (subscription) => subscription.subscriber, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  subscribers: Subscription[];

  @OneToMany(() => Subscription, (subscription) => subscription.subscribedTo)
  subscribedTo: Subscription[];
}
