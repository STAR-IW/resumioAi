import { Module } from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import { AnalyzeController } from './analyze.controller';
import {LlmService} from "../llm/llm.service";

@Module({
  providers: [AnalyzeService,LlmService],
  controllers: [AnalyzeController],
})
export class AnalyzeModule {}
