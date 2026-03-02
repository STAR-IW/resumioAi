import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { JobModule } from './job/job.module';
import {ConfigModule} from "@nestjs/config";
import { LlmModule } from './llm/llm.module';
import { AnalyzeModule } from './analyze/analyze.module';
import { AnalyzeService } from './analyze/analyze.service';
import {LlmService} from "./llm/llm.service";

@Module({

  imports: [ConfigModule.forRoot({ isGlobal: true }),UploadModule, JobModule, LlmModule, AnalyzeModule, ],
  controllers: [AppController],
  providers: [AppService, AnalyzeService,LlmService],
})
export class AppModule {}
