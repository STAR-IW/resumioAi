import { Injectable } from '@nestjs/common';
import {GoogleGenAI} from '@google/genai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LlmService {
    private ai;
    constructor(private configService: ConfigService) {
        this.ai = new GoogleGenAI({apiKey: this.configService.get<string>('GEMINI_API_KEY')});


    }

    async generateAiContent(prompt: string) {
        const response = await this.ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            //TODO change/delete config if getting unexpected behavior from llm
            //for more precise, deterministic, factual
            config:{temperature : 0.2}
        });
        return response.text;
    }

    async *streamAiContent(prompt: string) {
        const response = await this.ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
            //TODO change/delete config if getting unexpected behavior from llm
            //for more precise, deterministic, factual
            config:{temperature : 0.2}
        });

        for await (const chunk of response) {
            yield chunk.text;
        }
    }
}
