import { Injectable } from '@nestjs/common';
import {AnalyzeDto} from "./dto/analyze.dto";
import {ConfigService} from "@nestjs/config";
import {LlmService} from "../llm/llm.service";

@Injectable()
export class AnalyzeService {

    constructor(private configService: ConfigService, private llmService : LlmService) {

    }


    async analyzeData(analyzeDto: AnalyzeDto) {
        const prompt = this.buildPrompt(analyzeDto.cvText, analyzeDto.jobDescription);
        const llmResponse :string = await this.llmService.generateAiContent(prompt)
        const cleanText = llmResponse.replace(/```json|```/g, '').trim();

        return JSON.parse(cleanText);
    }
    private buildPrompt(cvText: string, jobDescription: string): string {
        return `
            You are a professional career advisor. Analyze the CV against the job description.
            
            CV:
            ${cvText}
            
            Job Description:
            ${jobDescription}
            
            Respond ONLY with valid JSON, no markdown, no backticks:
            {
              "matchScore": <0-100>,
              "missingSkills": ["skill1", "skill2"],
              "coverLetter": "...",
              "interviewQuestions": [
                { "question": "...", "suggestedAnswer": "..." }
              ]
            }`;
    }


}


