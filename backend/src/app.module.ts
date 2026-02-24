import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [UploadModule, JobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
