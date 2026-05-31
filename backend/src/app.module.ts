import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { JobModule } from './job/job.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { LlmModule } from './llm/llm.module';
import { AnalyzeModule } from './analyze/analyze.module';
import {ThrottlerGuard, ThrottlerModule} from "@nestjs/throttler";
import {APP_GUARD} from "@nestjs/core";
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryModule } from './history/history.module';


@Module({

  imports: [ConfigModule.forRoot({ isGlobal: true }),UploadModule, JobModule, LlmModule,HistoryModule, AnalyzeModule,MongooseModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB_URI'),
    }),
    inject: [ConfigService],
  }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, //60 second
          limit: 10, //max 10 requests per IP per window
        },
      ],
    }),
    HistoryModule,],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule {}
