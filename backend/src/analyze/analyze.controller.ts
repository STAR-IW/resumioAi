import {Body, Controller, Post, Sse} from '@nestjs/common';
import {AnalyzeDto} from "./dto/analyze.dto";
import {AnalyzeService} from "./analyze.service";
import {from, Observable} from "rxjs";
import { MessageEvent } from '@nestjs/common'


@Controller('analyze')
export class AnalyzeController {
    constructor(private readonly analyzeService: AnalyzeService) {
    }

    @Post()
    analyze(@Body() analyzeDto: AnalyzeDto) {
        return this.analyzeService.analyzeData(analyzeDto);
    }
    //stream llm result to client
    @Sse('stream')
    @Post('stream')
    stream(@Body() analyzeDto: AnalyzeDto): Observable<MessageEvent>{
        return from(this.analyzeService.streamCoverLetter(analyzeDto))
    }
}
