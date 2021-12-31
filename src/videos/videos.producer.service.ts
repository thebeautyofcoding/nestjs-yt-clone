import { Queue } from 'bull';
import { InjectQueue, OnQueueCompleted } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from 'src/videos/videos.entity';
import { Repository } from 'typeorm';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from './../users/users.entity';
var fs = require('fs');
@Injectable()
export class VideoProducerService {
  constructor(
    @InjectQueue('video') private videoQueue: Queue,
    @InjectRepository(Video) private repo: Repository<Video>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async convertToH264(videoPath: string, fileName: string) {
    return await this.videoQueue.add(
      'convertToH264',
      { videoPath, fileName },
      { delay: 10000 },
    );
  }

  async get3Screenshots(videoPath: string, fileName: string) {
    await this.videoQueue.add(
      'get3Screenshots',
      { videoPath: videoPath, fileName: fileName },
      { delay: 10000 },
    );
  }

  async createVideo(
    videoPath: string,
    description: string,
    title: string,
    userId: number,
  ): Promise<Video> {
    var video = this.repo.create({ path: videoPath, description, title });
    const user = await this.userRepo.findOne(userId);

    video.user = user;

    return await this.repo.save(video);
  }

  async findVideoById(id: string): Promise<Video> {
    const video = this.repo.findByIds([id])[0];
    return video;
  }

  async likeOrUnlikeVideo(videoId: string, userId: string) {
    console.log(videoId, userId);
    const result = await this.repo
      .createQueryBuilder()
      .where('id= :videoId', { videoId })
      .getOne();
    console.log(result);
    return result;
  }

  streamVideo(videoId: number, videoRange: string) {
    const videoPath = `src\\static\\videos\\converted\\${videoId}`;
    const videoStat = fs.statSync(videoPath);
    const fileSize = videoStat.size;
    videoRange = 'bytes=0-10223000600';
    const parts = videoRange.replace(/bytes=/, '').split('-');
    const CHUNK_SIZE = 10 ** 6;

    const start = parseInt(parts[0], 10);
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

    const contentLength = end - start + 1;

    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };

    return { file, head };
  }

  async updateVideo(videoId: number, thumbnail: string) {
    const video = await this.repo.findOne(videoId);
    video.thumbnail = thumbnail;
    return await this.repo.save(video);
  }

  async findAllVideos() {
    return await this.repo.find({ relations: ['user'] });
  }
}
