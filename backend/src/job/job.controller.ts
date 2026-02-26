import {Body, Controller, Post} from '@nestjs/common';
import {ScrapeJobDto} from "./dto/scrape-job.dto";
import {PasteJobDto} from "./dto/paste-job.dto";
import {JobService} from "./job.service";

@Controller('job')
export class JobController {
constructor(private readonly jobService: JobService) {}

    @Post('scrape')
    scrape(@Body() scapeJobDto:ScrapeJobDto){
        return this.jobService.scrapJob(scapeJobDto);
    }
    @Post('paste')
    paste(@Body() pasteJobDto:PasteJobDto){
        return this.jobService.pasteJob(pasteJobDto);
    }
}
