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
import {ThrottlerGuard, ThrottlerModule} from "@nestjs/throttler";
import {APP_GUARD} from "@nestjs/core";

@Module({

  imports: [ConfigModule.forRoot({ isGlobal: true }),UploadModule, JobModule, LlmModule, AnalyzeModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, //60 second
          limit: 10, //max 10 requests per IP per window
        },
      ],
    }),],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule {}
