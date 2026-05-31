import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {HistoryService} from "./history.service";
import {CreateHistoryDto} from "./dto/create-history.dto";

@Controller('history')
export class HistoryController {

    constructor(private historyService: HistoryService) {
    }

    @Post()
    saveHistory(@Body()createHistoryDto: CreateHistoryDto) {
            return this.historyService.saveHistory(createHistoryDto);
    }

    @Get(':id')
    getAnalysisByClientId(@Param('id') clientId:string) {
        return this.historyService.getAnalysisByClientId(clientId);
    }

    @Delete(':id')
    deleteAnalysisByAnalysisId(@Param('id') analysisId: string) {
        return this.historyService.deleteAnalysisByAnalysisId(analysisId);
    }

}
