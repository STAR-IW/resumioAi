import {Body, Controller, Get, Post} from '@nestjs/common';
import {LlmService} from "./llm.service";

@Controller('llm')
export class LlmController {
    constructor(private llmService: LlmService) {
    }
    @Post('test')
    test(@Body() body: {prompt : string}){
        return this.llmService.generateAiContent(body.prompt)
    }
}
