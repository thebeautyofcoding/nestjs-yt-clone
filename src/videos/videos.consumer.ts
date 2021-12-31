import { Processor, Process, OnQueueCompleted, InjectQueue, OnQueueActive, OnGlobalQueueActive, OnGlobalQueueCompleted } from '@nestjs/bull'
import { Job, Queue } from 'bull';
import { VideoProducerService } from './videos.producer.service';
import { Inject } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SocketService } from './../socket/socket.service'
var ffmpeg= require('fluent-ffmpeg')
@Processor('video')
export class VideoProcessingConsumer {
  constructor(@InjectQueue('video') private videoQueue: Queue, private socketService: SocketService) {
    
  }
  @Process('convertToH264')
  async toH264(job: Job<any>) {
  
   

    ffmpeg({ source: job.data.videoPath }).videoCodec('libx264').on('error', function (err) {
           
      console.log('An error occurred: ' + err.message);
    })
  .saveToFile(`src/static/videos/converted/${job.data.fileName}.mp4`).on('end', function () {
      console.log('done converting')
  })
  
  }

  @Process('get3Screenshots')
  async getScreenshots(job: Job<any>) {
    ffmpeg({source:job.data.videoPath})
      .on('filenames', function (filenames) {
    console.log(filenames)
    console.log('Will generate ' + filenames.join(', '))
  })
  .on('end', function() {
    console.log('Screenshots taken');
  })
  .screenshots({
    timestamps: ['10%', '20%', '50%'],
    count: 3,
    folder: 'src/static/thumbnails'
  });
  }


  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
  @OnQueueCompleted()
  async onCompleted(job: Job, result: any) {
    const pathToThumbnailDestination = '/src/static/thumbnails/';
    const thumbnails = [];
    for (let i = 0; i < 3; i++){
      thumbnails.push(`${pathToThumbnailDestination}tn_${i}`)
    }
    const pathToVideo='/src/static/videos/converted/'+job.data.fileName + '.mp4'
    if (job.name==='convertToH264') {
      this.socketService.socket.emit('videoUpload.completed', pathToVideo)
    } else {
      this.socketService.socket.emit('thumbnailCreation.completed', thumbnails)
    }
    
   }
    
  }
