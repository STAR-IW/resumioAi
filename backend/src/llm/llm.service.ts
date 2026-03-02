import { Injectable } from '@nestjs/common';
import {GoogleGenAI} from '@google/genai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LlmService {
    private ai;
    constructor(private configService: ConfigService) {


    }

    async generateAiContent(prompt: string) {
        this.ai = new GoogleGenAI({apiKey: this.configService.get<string>('GEMINI_API_KEY')});
        const response = await this.ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        // console.log(response.text);
        return response.text;
    }
}
