import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { JobModule } from './job/job.module';
import {ConfigModule} from "@nestjs/config";
import { LlmModule } from './llm/llm.module';

@Module({

  imports: [ConfigModule.forRoot({ isGlobal: true }),UploadModule, JobModule, LlmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
