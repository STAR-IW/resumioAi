import {Body, Controller, Post} from '@nestjs/common';
import {AnalyzeDto} from "./dto/analyze.dto";
import {AnalyzeService} from "./analyze.service";

@Controller('analyze')
export class AnalyzeController {
    constructor(private readonly analyzeService: AnalyzeService) {
    }

    @Post()
    analyze(@Body() analyzeDto: AnalyzeDto) {
        return this.analyzeService.analyzeData(analyzeDto);
    }
}
